/**
 * POST /api/project-inquiry
 *
 * Receives a submission from the website's purchase/project inquiry stepper,
 * validates + sanitizes it, stores it in Sanity (source of truth), then sends an
 * internal notification email to the operations manager.
 *
 * Secrets (Sanity write token, Gmail creds) live only in server env vars.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getWriteClient } from './_lib/sanityServer.js';
import { sendOperationsEmail, sendEmail, line, type NotifyResult } from './_lib/notify.js';
import { renderBrandedEmail, renderBrandedText, type DetailRow } from './_lib/emailTemplate.js';
import {
  cleanString,
  optionalString,
  isValidEmail,
  isValidPhone,
  parseBody,
} from './_lib/validation.js';

function cleanAttribution(body: Record<string, unknown>) {
  const raw = body.attribution;
  const attribution =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

  return {
    landingPage: optionalString(attribution.landingPage, 1000),
    landingPagePath: optionalString(attribution.landingPagePath, 500),
    conversionPage: optionalString(attribution.conversionPage, 1000),
    referrer: optionalString(attribution.referrer, 1000),
    firstSeenAt: optionalString(attribution.firstSeenAt, 80),
    lastSeenAt: optionalString(attribution.lastSeenAt, 80),
    utmSource: optionalString(attribution.utmSource, 200),
    utmMedium: optionalString(attribution.utmMedium, 200),
    utmCampaign: optionalString(attribution.utmCampaign, 300),
    utmTerm: optionalString(attribution.utmTerm, 300),
    utmContent: optionalString(attribution.utmContent, 300),
    gclid: optionalString(attribution.gclid, 300),
    gbraid: optionalString(attribution.gbraid, 300),
    wbraid: optionalString(attribution.wbraid, 300),
    msclkid: optionalString(attribution.msclkid, 300),
    fbclid: optionalString(attribution.fbclid, 300),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = parseBody(req.body);

  // Honeypot — bots fill hidden fields; humans never see them. Pretend success.
  if (cleanString(body.company)) {
    return res.status(200).json({ ok: true });
  }

  // ── Validate & sanitize ────────────────────────────────────────────────────
  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 254).toLowerCase();
  const phone = cleanString(body.phone, 40);

  const errors: string[] = [];
  if (!name) errors.push('Name is required.');
  if (!email || !isValidEmail(email)) errors.push('A valid email is required.');
  if (!phone || !isValidPhone(phone)) errors.push('A valid phone number is required.');

  if (errors.length) {
    return res.status(400).json({ ok: false, error: errors.join(' ') });
  }

  const projectType = optionalString(body.projectType, 120);
  const timeline = optionalString(body.timeline, 120);
  const projectAddress = optionalString(body.projectAddress ?? body.serviceArea ?? body.zip, 200);
  const budgetRange = optionalString(body.budgetRange, 120);
  const projectDetails = optionalString(body.projectDetails, 4000);
  const preferredContactMethod = optionalString(body.preferredContactMethod, 60);
  const decisionReason = optionalString(body.decisionReason, 500);
  const sourcePage = optionalString(body.sourcePage, 120) || 'purchase-inquiry-stepper';
  const attribution = cleanAttribution(body);

  const submittedAt = new Date().toISOString();

  // ── Save to Sanity (source of truth) ───────────────────────────────────────
  let client;
  try {
    client = getWriteClient();
  } catch (err) {
    console.error('[project-inquiry] Sanity not configured:', err);
    return res.status(500).json({
      ok: false,
      error: 'We could not submit your inquiry right now. Please call us and we will help directly.',
    });
  }

  // Lightweight duplicate guard: same email + project type within the last 2 minutes.
  try {
    const since = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const recent = await client.fetch<number>(
      'count(*[_type == "projectInquiry" && email == $email && submittedAt > $since])',
      { email, since },
    );
    if (recent > 0) {
      return res.status(200).json({ ok: true, duplicate: true });
    }
  } catch (err) {
    // Non-fatal — proceed with the submission even if the dedupe query fails.
    console.warn('[project-inquiry] Duplicate check failed:', err);
  }

  let createdId: string;
  try {
    const doc = await client.create({
      _type: 'projectInquiry',
      name,
      email,
      phone,
      projectType,
      timeline,
      projectAddress,
      budgetRange,
      projectDetails,
      preferredContactMethod,
      decisionReason,
      status: 'new',
      priority: 'medium',
      submittedAt,
      sourcePage,
      ...attribution,
      rawSubmissionData: JSON.stringify(body, null, 2),
    });
    createdId = doc._id;
  } catch (err) {
    console.error('[project-inquiry] Failed to create Sanity document:', err);
    return res.status(502).json({
      ok: false,
      error: 'We could not submit your inquiry right now. Please try again or call us.',
    });
  }

  // ── Notify operations manager (failure must NOT lose the submission) ────────
  const text =
    `New project inquiry from the Sure-Fix website.\n\n` +
    line('Name', name) +
    line('Phone', phone) +
    line('Email', email) +
    line('Project Type', projectType) +
    line('Budget Range', budgetRange) +
    line('Timeline', timeline) +
    line('Service Area / Address', projectAddress) +
    line('Preferred Contact', preferredContactMethod) +
    line('Why They Chose Sure-Fix', decisionReason) +
    line('Project Details', projectDetails) +
    line('Landing Page', attribution.landingPage) +
    line('Conversion Page', attribution.conversionPage) +
    line('Referrer', attribution.referrer) +
    line(
      'Campaign',
      [attribution.utmSource, attribution.utmMedium, attribution.utmCampaign]
        .filter(Boolean)
        .join(' / '),
    ) +
    line(
      'Click IDs',
      [
        attribution.gclid && `gclid: ${attribution.gclid}`,
        attribution.gbraid && `gbraid: ${attribution.gbraid}`,
        attribution.wbraid && `wbraid: ${attribution.wbraid}`,
        attribution.msclkid && `msclkid: ${attribution.msclkid}`,
        attribution.fbclid && `fbclid: ${attribution.fbclid}`,
      ]
        .filter(Boolean)
        .join(' | '),
    ) +
    line('Submitted', new Date(submittedAt).toLocaleString('en-US')) +
    line('Source', sourcePage) +
    `\nReview and update this lead in Sanity Studio (status, priority, follow-up, notes).`;

  let notify: NotifyResult;
  try {
    notify = await sendOperationsEmail({
      subject: `New Website Project Inquiry – ${projectType || 'General'}`,
      text,
    });
  } catch (err) {
    notify = { ok: false, skipped: false, reason: err instanceof Error ? err.message : 'Unknown' };
  }

  // Record notification outcome on the document for the team's visibility.
  const notificationStatus = notify.ok
    ? 'sent'
    : 'skipped' in notify && notify.skipped
      ? 'skipped (email not configured)'
      : `failed: ${notify.reason}`;
  try {
    await client.patch(createdId).set({ notificationStatus }).commit();
  } catch (err) {
    console.warn('[project-inquiry] Could not record notificationStatus:', err);
  }

  // ── Branded confirmation email to the prospect (best-effort) ────────────────
  try {
    const firstName = name.split(' ')[0] || '';
    const isGiftCard = sourcePage === 'promo-popup-500-gift-card';
    const isKitchenPromo = sourcePage === 'kitchen-promo-stepper';

    const paragraphs = isKitchenPromo
      ? [
          `Your request for the <strong>Sure-Fix Kitchen Sale</strong> is in. We've noted your <strong>10% savings, up to $2,000</strong>, with your kitchen consultation.`,
          `One of our team members will reach out within <strong>24 hours</strong> to learn about your space, priorities, and timeline.`,
          `<strong>Prices will never be lower.</strong> We look forward to helping you plan the heart of your home.`,
        ]
      : isGiftCard
      ? [
          `Welcome to the Sure-Fix family, ${firstName || 'friend'}! Your <strong>$500 gift card</strong> is officially earned and reserved under your name — see it above.`,
          `One of our team members will reach out within <strong>24 hours</strong> to learn about your project and walk you through how to redeem it toward your free estimate.`,
          `We can't wait to show you what we can do with your space.`,
        ]
      : [
          `Thank you for reaching out to Sure-Fix Remodeling. We've received your request and a member of our family-run team will follow up within <strong>24 hours</strong> to talk through your project and schedule a free, no-obligation estimate.`,
          `In the meantime, feel free to call us with any questions — we're always happy to help.`,
        ];

    const highlightRows: DetailRow[] = [
      ...(isKitchenPromo ? [{ label: 'Kitchen offer', value: '10% off — up to $2,000' }] : []),
      { label: 'Project', value: projectType },
      { label: 'Timeline', value: timeline },
      { label: 'Preferred contact', value: preferredContactMethod },
      { label: 'Why Sure-Fix', value: decisionReason },
      { label: 'Service area', value: projectAddress },
    ];

    const emailOpts = {
      preheader: isKitchenPromo
        ? `Your kitchen sale request is confirmed — 10% off up to $2,000.`
        : isGiftCard
        ? `Welcome, ${firstName || 'friend'}! Your $500 Sure-Fix gift card is earned and ready.`
        : 'We received your request — here\u2019s what happens next.',
      heading: isKitchenPromo
        ? `Your kitchen savings are noted${firstName ? `, ${firstName}` : ''}!`
        : isGiftCard
        ? `You earned it, ${firstName || 'friend'}!`
        : firstName ? `Thanks, ${firstName}!` : 'Thank you!',
      paragraphs,
      giftCardRecipient: isGiftCard ? name : undefined,
      highlightTitle: isGiftCard ? undefined : isKitchenPromo ? 'Your kitchen sale request' : 'Your request',
      highlightRows: isGiftCard ? [] : highlightRows,
      ctaLabel: isKitchenPromo ? 'Explore Kitchen Remodeling' : isGiftCard ? 'See Our Work' : 'See Our Recent Work',
      ctaHref: isKitchenPromo
        ? 'https://surefixremodelinglv.com/services/kitchen'
        : 'https://surefixremodelinglv.com/showroom',
    };

    await sendEmail({
      to: email,
      subject: isKitchenPromo
        ? `Your Sure-Fix kitchen sale request is confirmed`
        : isGiftCard
        ? `You earned your $500 Sure-Fix gift card, ${firstName || 'friend'}!`
        : 'Thanks for contacting Sure-Fix Remodeling',
      text: renderBrandedText(emailOpts),
      html: renderBrandedEmail(emailOpts),
      fromName: 'Sure-Fix Remodeling',
      replyTo: process.env.OPERATIONS_MANAGER_EMAIL || undefined,
    });
  } catch (err) {
    // Confirmation email is non-critical — never fail the submission for it.
    console.warn('[project-inquiry] Could not send prospect confirmation:', err);
  }

  // Submission was saved — return success regardless of email outcome.
  return res.status(200).json({ ok: true, id: createdId });
}
