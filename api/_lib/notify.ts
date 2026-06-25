/**
 * Internal email notifications for the operations manager.
 *
 * Server-side only. Uses Gmail via nodemailer's OAuth2 transport.
 * This is intentionally an abstraction: if the Gmail credentials are not configured,
 * sending is skipped gracefully (logged) so a missing email setup never blocks a
 * Sanity submission. Callers should record the returned status on the document.
 *
 * Supported environment variables (all secret — set in Vercel, never client-side):
 *   GMAIL_CLIENT_ID
 *   GMAIL_CLIENT_SECRET
 *   GMAIL_REFRESH_TOKEN
 *   GMAIL_FROM_EMAIL           (the Gmail account that sends the notification)
 *   GMAIL_APP_PASSWORD         (recommended stable Gmail fallback; requires 2FA)
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD / SMTP_FROM_EMAIL
 *   OPERATIONS_MANAGER_EMAIL   (recipient — falls back to GMAIL_FROM_EMAIL)
 */
import nodemailer from 'nodemailer';

export type NotifyResult =
  | { ok: true }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; reason: string };

interface SendArgs {
  subject: string;
  text: string;
  html?: string;
}

interface SendToArgs extends SendArgs {
  /** Recipient address. */
  to: string;
  /** Friendly From display name (defaults to "Sure-Fix Remodeling"). */
  fromName?: string;
  /** Optional Reply-To (e.g. the operations inbox). */
  replyTo?: string;
}

function getGmailCreds() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const from = process.env.GMAIL_FROM_EMAIL;

  if (!clientId || !clientSecret || !refreshToken || !from) {
    return null;
  }
  return { clientId, clientSecret, refreshToken, from };
}

function getGmailAppPasswordCreds() {
  const user = process.env.GMAIL_FROM_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return { user, pass };
}

function getSmtpCreds() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM_EMAIL || process.env.GMAIL_FROM_EMAIL || user;
  if (!host || !user || !pass || !from) return null;
  return { host, port, user, pass, from };
}

/**
 * Low-level send to an explicit recipient.
 * Never throws — always resolves with a NotifyResult the caller can persist.
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  fromName = 'Sure-Fix Remodeling',
  replyTo,
}: SendToArgs): Promise<NotifyResult> {
  const smtp = getSmtpCreds();
  const appPassword = getGmailAppPasswordCreds();
  const oauth = getGmailCreds();
  if (!smtp && !appPassword && !oauth) {
    const reason = 'Email env vars not configured — email skipped.';
    console.warn(`[notify] ${reason}`);
    return { ok: false, skipped: true, reason };
  }
  if (!to) {
    return { ok: false, skipped: true, reason: 'No recipient address.' };
  }

  try {
    const transporter = nodemailer.createTransport(
      smtp
        ? {
            host: smtp.host,
            port: smtp.port,
            secure: smtp.port === 465,
            auth: { user: smtp.user, pass: smtp.pass },
          }
        : appPassword
          ? {
              service: 'gmail',
              auth: { user: appPassword.user, pass: appPassword.pass },
            }
          : {
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: oauth!.from,
                clientId: oauth!.clientId,
                clientSecret: oauth!.clientSecret,
                refreshToken: oauth!.refreshToken,
              },
            },
    );
    const fromAddress = smtp?.from || appPassword?.user || oauth!.from;

    await transporter.sendMail({
      from: `${fromName} <${fromAddress}>`,
      to,
      replyTo,
      subject,
      text,
      html: html || `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });

    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[notify] Failed to send email:', reason);
    return { ok: false, skipped: false, reason };
  }
}

/**
 * Send an internal notification email to the operations manager.
 * Never throws — always resolves with a NotifyResult the caller can persist.
 */
export async function sendOperationsEmail({ subject, text, html }: SendArgs): Promise<NotifyResult> {
  const to = process.env.OPERATIONS_MANAGER_EMAIL || process.env.GMAIL_FROM_EMAIL || '';
  return sendEmail({ to, subject, text, html, fromName: 'Sure-Fix Website' });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Build a labeled plain-text line, omitting empty values. */
export function line(label: string, value?: string | null): string {
  if (!value) return '';
  return `${label}: ${value}\n`;
}
