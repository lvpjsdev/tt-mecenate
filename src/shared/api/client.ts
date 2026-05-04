import Axios, { type AxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import { normalizeError } from '../ui/uiErrors';

export const apiClient = Axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = env.EXPO_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    const normalError = normalizeError(error);

    return Promise.reject(normalError);
  },
);

type ApiResponse<T> = { ok?: boolean; data?: T };

export const customClient = async <TResponse extends ApiResponse<unknown>>(
  config: AxiosRequestConfig,
): Promise<NonNullable<TResponse['data']>> => {
  const response = await apiClient<TResponse>(config);

  return response.data.data as NonNullable<TResponse['data']>;
};
