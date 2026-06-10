/**
 * Internal email notifications for the operations manager.
 *
 * Server-side only. Uses Gmail via nodemailer's OAuth2 transport.
 * This is intentionally an abstraction: if the Gmail credentials are not configured,
 * sending is skipped gracefully (logged) so a missing email setup never blocks a
 * Sanity submission. Callers should record the returned status on the document.
 *
 * Required environment variables (all secret — set in Vercel, never client-side):
 *   GMAIL_CLIENT_ID
 *   GMAIL_CLIENT_SECRET
 *   GMAIL_REFRESH_TOKEN
 *   GMAIL_FROM_EMAIL           (the Gmail account that sends the notification)
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

function getGmailConfig() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const from = process.env.GMAIL_FROM_EMAIL;
  const to = process.env.OPERATIONS_MANAGER_EMAIL || from;

  if (!clientId || !clientSecret || !refreshToken || !from || !to) {
    return null;
  }
  return { clientId, clientSecret, refreshToken, from, to };
}

/**
 * Send an internal notification email.
 * Never throws — always resolves with a NotifyResult the caller can persist.
 */
export async function sendOperationsEmail({ subject, text, html }: SendArgs): Promise<NotifyResult> {
  const cfg = getGmailConfig();
  if (!cfg) {
    const reason = 'Gmail env vars not configured — notification skipped.';
    console.warn(`[notify] ${reason}`);
    return { ok: false, skipped: true, reason };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: cfg.from,
        clientId: cfg.clientId,
        clientSecret: cfg.clientSecret,
        refreshToken: cfg.refreshToken,
      },
    });

    await transporter.sendMail({
      from: `Sure-Fix Website <${cfg.from}>`,
      to: cfg.to,
      subject,
      text,
      html: html || `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    });

    return { ok: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[notify] Failed to send operations email:', reason);
    return { ok: false, skipped: false, reason };
  }
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
