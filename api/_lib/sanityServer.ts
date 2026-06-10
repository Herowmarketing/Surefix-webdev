/**
 * Server-side Sanity client (write access).
 *
 * This module is ONLY imported by serverless functions in /api — never by browser code.
 * It uses a write token that must be kept secret (set as a Vercel environment variable).
 */
import { createClient, type SanityClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || 'kqp67u17';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_WRITE_TOKEN;

let cached: SanityClient | null = null;

/**
 * Returns a configured write-enabled Sanity client.
 * Throws if no write token is configured so callers can fail loudly server-side.
 */
export function getWriteClient(): SanityClient {
  if (!token) {
    throw new Error(
      'SANITY_WRITE_TOKEN is not set. Configure it in the Vercel project environment variables.',
    );
  }
  if (cached) return cached;
  cached = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false, // never cache writes / freshly created docs
  });
  return cached;
}

export const sanityConfig = { projectId, dataset, apiVersion };
