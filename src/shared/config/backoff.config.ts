export interface BackoffConfig {
  baseDelayMs: number;
  exponentialBase: number;
  maxDelayMs: number;
  jitterMs: number;
}

export const HTTP_BACKOFF_CONFIG: BackoffConfig = {
  baseDelayMs: 1_000,
  exponentialBase: 2,
  maxDelayMs: 30_000,
  jitterMs: 300,
};

export const WS_BACKOFF_CONFIG: BackoffConfig = {
  baseDelayMs: 500,
  exponentialBase: 2,
  maxDelayMs: 10_000,
  jitterMs: 200,
};
