/**
 * Shared server-side validation & sanitization helpers for the intake endpoints.
 * Keep this dependency-free so it stays cheap to run in a serverless function.
 */

/** Coerce any value to a trimmed, length-capped, control-char-stripped string. */
export function cleanString(value: unknown, maxLen = 2000): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Strip ASCII control characters except common whitespace.
  // eslint-disable-next-line no-control-regex
  const stripped = str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return stripped.trim().slice(0, maxLen);
}

/** Normalize an optional string — returns undefined when empty so Sanity omits the field. */
export function optionalString(value: unknown, maxLen = 2000): string | undefined {
  const cleaned = cleanString(value, maxLen);
  return cleaned.length ? cleaned : undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= 254;
}

/** Loose phone check — at least 7 digits after stripping formatting. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** Normalize an optional URL; returns undefined if missing/blank/clearly invalid. */
export function optionalUrl(value: unknown): string | undefined {
  const cleaned = cleanString(value, 500);
  if (!cleaned) return undefined;
  const withProtocol = /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
  try {
    // eslint-disable-next-line no-new
    new URL(withProtocol);
    return withProtocol;
  } catch {
    return undefined;
  }
}

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] };

/** Safely parse a JSON request body that may arrive as an object or a raw string. */
export function parseBody(body: unknown): Record<string, unknown> {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (typeof body === 'object') return body as Record<string, unknown>;
  return {};
}
