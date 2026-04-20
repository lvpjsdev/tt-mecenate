const RETRY_BASE_DELAY_MS = 1000;
const RETRY_EXPONENTIAL_BASE = 2;
const RETRY_MAX_DELAY_MS = 30_000;
const RETRY_JITTER_MS = 300;

// Получение возрастающей задержки с jitter для повторных попыток
export const getRetryDelay = (attempt: number) =>
  Math.min(RETRY_BASE_DELAY_MS * RETRY_EXPONENTIAL_BASE ** attempt, RETRY_MAX_DELAY_MS) +
  Math.random() * RETRY_JITTER_MS;
