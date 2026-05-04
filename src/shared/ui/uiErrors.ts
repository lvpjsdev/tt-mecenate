import axios from 'axios';
import { ERROR_MESSAGES, type ErrorDictionaryKey } from './errorDictionary';

export type UIError =
  | { type: 'network'; uiText: string }
  | { type: 'server'; code: number; apiCode?: string; uiText: string }
  | { type: 'unauthorized'; uiText: string }
  | { type: 'not_found'; uiText: string }
  | { type: 'validation'; message?: string; uiText: string }
  | { type: 'unknown'; uiText: string };

const resolveUiText = (type: UIError['type'], apiCode?: string): string => {
  if (apiCode && apiCode in ERROR_MESSAGES) {
    return ERROR_MESSAGES[apiCode as ErrorDictionaryKey];
  }
  if (type in ERROR_MESSAGES) {
    return ERROR_MESSAGES[type as ErrorDictionaryKey];
  }
  return ERROR_MESSAGES.unknown;
};

const extractApiCode = (responseData: unknown): string | undefined => {
  if (
    responseData &&
    typeof responseData === 'object' &&
    'error' in responseData &&
    responseData.error &&
    typeof responseData.error === 'object' &&
    'code' in responseData.error &&
    typeof (responseData.error as { code: unknown }).code === 'string'
  ) {
    return (responseData.error as { code: string }).code;
  }
  return undefined;
};

export const normalizeError = (e: unknown): UIError => {
  if (axios.isAxiosError(e)) {
    if (!e.response) {
      return { type: 'network', uiText: resolveUiText('network') };
    }

    const { status, data } = e.response;
    const apiCode = extractApiCode(data);

    if (status === 401) {
      return {
        type: 'unauthorized',
        uiText: resolveUiText('unauthorized', apiCode),
      };
    }

    if (status === 404) {
      return {
        type: 'not_found',
        uiText: resolveUiText('not_found', apiCode),
      };
    }

    if (status === 400) {
      const message = data?.error?.message ?? undefined;
      return {
        type: 'validation',
        message,
        uiText: resolveUiText('validation', apiCode),
      };
    }

    if (status >= 500) {
      return {
        type: 'server',
        code: status,
        apiCode,
        uiText: resolveUiText('server', apiCode),
      };
    }
  }

  return {
    type: 'unknown',
    uiText: resolveUiText('unknown'),
  };
};

export const getUIErrorMessage = (error: UIError): string => {
  return error.uiText;
};
