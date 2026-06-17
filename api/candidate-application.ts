/**
 * POST /api/candidate-application
 *
 * Receives a submission from the Careers page application form, validates +
 * sanitizes it, stores it in Sanity, then emails the operations manager.
 *
 * Secrets (Sanity write token, Gmail creds) live only in server env vars.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getWriteClient } from './_lib/sanityServer.js';
import { sendOperationsEmail, line, type NotifyResult } from './_lib/notify.js';
import {
  cleanString,
  optionalString,
  optionalUrl,
  isValidEmail,
  isValidPhone,
  parseBody,
} from './_lib/validation.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = parseBody(req.body);

  // Honeypot
  if (cleanString(body.company)) {
    return res.status(200).json({ ok: true });
  }

  // ── Validate & sanitize ────────────────────────────────────────────────────
  const fullName = cleanString(body.fullName, 120);
  const email = cleanString(body.email, 254).toLowerCase();
  const phone = cleanString(body.phone, 40);
  const positionAppliedFor = cleanString(body.positionAppliedFor, 160) || 'General Application';
  const consent = body.consent === true || body.consent === 'true';

  const errors: string[] = [];
  if (!fullName) errors.push('Full name is required.');
  if (!email || !isValidEmail(email)) errors.push('A valid email is required.');
  if (!phone || !isValidPhone(phone)) errors.push('A valid phone number is required.');
  if (!consent) errors.push('Consent confirmation is required.');

  if (errors.length) {
    return res.status(400).json({ ok: false, error: errors.join(' ') });
  }

  const isGeneralApplication =
    body.isGeneralApplication === true ||
    body.isGeneralApplication === 'true' ||
    positionAppliedFor.toLowerCase() === 'general application';

  const location = optionalString(body.location, 160);
  const tradeOrDepartmentInterest = optionalString(body.tradeOrDepartmentInterest, 160);
  const yearsOfExperience = optionalString(body.yearsOfExperience, 60);
  const skills = optionalString(body.skills, 2000);
  const certificationsOrLicenses = optionalString(body.certificationsOrLicenses, 2000);
  const resumeUrl = optionalUrl(body.resumeUrl);
  const portfolioUrl = optionalUrl(body.portfolioUrl);
  const linkedinUrl = optionalUrl(body.linkedinUrl);
  const availabilityOrStartDate = optionalString(body.availabilityOrStartDate, 120);
  const workAuthorization = optionalString(body.workAuthorization, 60);
  const reliableTransportation = optionalString(body.reliableTransportation, 60);
  const additionalNotes = optionalString(body.additionalNotes, 4000);
  const sourcePage =
    optionalString(body.sourcePage, 120) ||
    (isGeneralApplication ? 'careers-page-general' : 'careers-page-role');

  const submittedAt = new Date().toISOString();

  // ── Save to Sanity ─────────────────────────────────────────────────────────
  let client;
  try {
    client = getWriteClient();
  } catch (err) {
    console.error('[candidate-application] Sanity not configured:', err);
    return res.status(500).json({
      ok: false,
      error: 'We could not submit your application right now. Please email us directly.',
    });
  }

  // Duplicate guard: same email + position within the last 2 minutes.
  try {
    const since = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const recent = await client.fetch<number>(
      'count(*[_type == "candidateApplication" && email == $email && positionAppliedFor == $position && submittedAt > $since])',
      { email, position: positionAppliedFor, since },
    );
    if (recent > 0) {
      return res.status(200).json({ ok: true, duplicate: true });
    }
  } catch (err) {
    console.warn('[candidate-application] Duplicate check failed:', err);
  }

  let createdId: string;
  try {
    const doc = await client.create({
      _type: 'candidateApplication',
      fullName,
      email,
      phone,
      location,
      positionAppliedFor,
      isGeneralApplication,
      tradeOrDepartmentInterest,
      yearsOfExperience,
      skills,
      certificationsOrLicenses,
      resumeUrl,
      portfolioUrl,
      linkedinUrl,
      availabilityOrStartDate,
      workAuthorization,
      reliableTransportation,
      additionalNotes,
      status: 'new',
      ratingOrPriority: 'medium',
      submittedAt,
      sourcePage,
      rawSubmissionData: JSON.stringify(body, null, 2),
    });
    createdId = doc._id;
  } catch (err) {
    console.error('[candidate-application] Failed to create Sanity document:', err);
    return res.status(502).json({
      ok: false,
      error: 'We could not submit your application right now. Please try again or email us.',
    });
  }

  // ── Notify operations manager ──────────────────────────────────────────────
  const links = [
    resumeUrl ? `Resume: ${resumeUrl}` : '',
    portfolioUrl ? `Portfolio: ${portfolioUrl}` : '',
    linkedinUrl ? `LinkedIn: ${linkedinUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const text =
    `New candidate application from the Sure-Fix Careers page.\n\n` +
    line('Full Name', fullName) +
    line('Phone', phone) +
    line('Email', email) +
    line('Location', location) +
    line('Position Applied For', positionAppliedFor) +
    line('Trade / Department', tradeOrDepartmentInterest) +
    line('Years of Experience', yearsOfExperience) +
    line('Skills', skills) +
    line('Availability / Start Date', availabilityOrStartDate) +
    (links ? `\n${links}\n` : '') +
    line('Submitted', new Date(submittedAt).toLocaleString('en-US')) +
    line('Source', sourcePage) +
    `\nReview and update this application in Sanity Studio (status, rating, follow-up, notes).`;

  let notify: NotifyResult;
  try {
    notify = await sendOperationsEmail({
      subject: `New Candidate Application – ${positionAppliedFor}`,
      text,
    });
  } catch (err) {
    notify = { ok: false, skipped: false, reason: err instanceof Error ? err.message : 'Unknown' };
  }

  const notificationStatus = notify.ok
    ? 'sent'
    : 'skipped' in notify && notify.skipped
      ? 'skipped (email not configured)'
      : `failed: ${notify.reason}`;
  try {
    await client.patch(createdId).set({ notificationStatus }).commit();
  } catch (err) {
    console.warn('[candidate-application] Could not record notificationStatus:', err);
  }

  return res.status(200).json({ ok: true, id: createdId });
}
