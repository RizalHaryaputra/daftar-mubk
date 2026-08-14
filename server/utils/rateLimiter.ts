import type { H3Event } from 'h3';
import { getHeader, getRequestIP, setResponseHeader } from 'h3';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory rate limit storage
const store = new Map<string, RateLimitRecord>();

// Periodic cleanup every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

const cleanupStore = () => {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
};

/**
 * Get accurate client IP across reverse proxies (Cloudflare, Nginx, Vercel)
 */
export const getClientIp = (event: H3Event): string => {
  const cfIp = getHeader(event, 'cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xRealIp = getHeader(event, 'x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = getHeader(event, 'x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    if (ips[0]) return ips[0];
  }

  const reqIp = getRequestIP(event, { xForwardedFor: true });
  return reqIp || '127.0.0.1';
};

export interface RateLimitOptions {
  keyPrefix?: string;
  maxRequests: number;
  windowSeconds: number;
  customMessage?: string;
}

/**
 * Enforce rate limiting based on key identifier (e.g. IP or email)
 */
export const enforceRateLimit = (
  event: H3Event,
  identifier: string,
  options: RateLimitOptions
) => {
  cleanupStore();

  const { keyPrefix = 'rl', maxRequests, windowSeconds, customMessage } = options;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let record = store.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs
    };
    store.set(key, record);
  } else {
    record.count++;
  }

  const remaining = Math.max(0, maxRequests - record.count);
  const resetSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

  // Set standard RateLimit headers on HTTP response
  setResponseHeader(event, 'X-RateLimit-Limit', maxRequests);
  setResponseHeader(event, 'X-RateLimit-Remaining', remaining);
  setResponseHeader(event, 'X-RateLimit-Reset', resetSeconds);

  if (record.count > maxRequests) {
    setResponseHeader(event, 'Retry-After', resetSeconds);
    throw createError({
      statusCode: 429,
      statusMessage: customMessage || `Terlalu banyak permintaan dari perangkat Anda. Silakan coba lagi dalam ${resetSeconds} detik.`
    });
  }

  return { remaining, resetSeconds };
};
