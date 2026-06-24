import { API_BACKEND_URL } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { ApiError, ApiResponse } from '@/lib/types';

import { HttpMethod } from '@/lib/types/http-method';
import { parseResponse } from '../parse-response';
import { attemptRefresh } from './refresh';

interface RequestOptions<Body = undefined> {
  body?: Body;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
}

async function apiRequest<T, Body = undefined>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions<Body> = {},
  hasRetried = false,
): Promise<ApiResponse<T>> {
  const { body, headers = {}, credentials, signal } = options;

  let response: Response;

  try {
    response = await fetch(`${API_BACKEND_URL}/${endpoint}`, {
      method,
      credentials,
      signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw {
      message: 'No se pudo conectar con el servidor',
      status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    } satisfies ApiError;
  }

  const json = await parseResponse<unknown>(response);

  if (!response.ok) {
    const canRefresh = response.status === HTTP_STATUS.UNAUTHORIZED && !hasRetried;

    if (canRefresh) {
      const refreshed = await attemptRefresh();

      if (refreshed) {
        return apiRequest<T, Body>(method, endpoint, options, true);
      }
    }

    const error = json as Partial<ApiError> | null;

    throw {
      message: error?.message ?? 'Error en la petición',
      status: response.status,
      errors: error?.errors ?? null,
    } satisfies ApiError;
  }

  return json as ApiResponse<T>;
}

export const ApiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => apiRequest<T>('GET', endpoint, options),

  post: <T, B = unknown>(endpoint: string, body?: B, options?: RequestOptions<B>) =>
    apiRequest<T, B>('POST', endpoint, {
      ...options,
      body,
    }),

  put: <T, B = unknown>(endpoint: string, body?: B, options?: RequestOptions<B>) =>
    apiRequest<T, B>('PUT', endpoint, {
      ...options,
      body,
    }),

  patch: <T, B = unknown>(endpoint: string, body?: B, options?: RequestOptions<B>) =>
    apiRequest<T, B>('PATCH', endpoint, {
      ...options,
      body,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>('DELETE', endpoint, options),
};
