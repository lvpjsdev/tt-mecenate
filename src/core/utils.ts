import type { BackoffConfig } from '@/shared/config/backoff.config';
import { HTTP_BACKOFF_CONFIG } from '@/shared/config/backoff.config';

export const createExponentialBackoff = (config: BackoffConfig) => {
  const { baseDelayMs, exponentialBase, maxDelayMs, jitterMs } = config;

  return (attempt: number): number =>
    Math.min(baseDelayMs * exponentialBase ** attempt, maxDelayMs) + Math.random() * jitterMs;
};

export const getRetryDelay = createExponentialBackoff(HTTP_BACKOFF_CONFIG);
