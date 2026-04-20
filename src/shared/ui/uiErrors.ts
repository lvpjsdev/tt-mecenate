import axios from 'axios';

export type UIError = { type: 'network' } | { type: 'server'; code: number } | { type: 'unknown' };

export const normalizeError = (e: unknown): UIError => {
  if (axios.isAxiosError(e)) {
    if (!e.response) {
      return { type: 'network' };
    }

    if (e.response.status >= 500) {
      return {
        type: 'server',
        code: e.response.status,
      };
    }
  }

  return {
    type: 'unknown',
  };
};
