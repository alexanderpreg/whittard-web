import { cookies } from 'next/headers';

import { API_BACKEND_URL } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { ApiError, ApiResponse } from '@/lib/types';
import { HttpMethod } from '@/lib/types/http-method';
import { parseResponse } from '../parse-response';

export interface ServerRequestOptions<Body = undefined> {
  body?: Body;
  headers?: Record<string, string>;
  auth?: boolean | 'optional';
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export class ServerAuthError extends Error {
  readonly status = HTTP_STATUS.UNAUTHORIZED;

  constructor(message = 'Unauthenticated') {
    super(message);
    this.name = 'ServerAuthError';
  }
}

async function apiRequest<T, Body = undefined>(
  method: HttpMethod,
  endpoint: string,
  options: ServerRequestOptions<Body> = {},
): Promise<ApiResponse<T>> {
  const { body, headers = {}, auth = true, cache = 'no-store', next } = options;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  if (auth === true && !cookieHeader) {
    throw new ServerAuthError();
  }

  let response: Response;

  try {
    response = await fetch(`${API_BACKEND_URL}/${endpoint}`, {
      method,
      cache,
      next,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(cookieHeader
          ? {
              Cookie: cookieHeader,
            }
          : {}),
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
    const error = json as Partial<ApiError> | null;

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      throw new ServerAuthError(error?.message);
    }

    throw {
      message: error?.message ?? 'Error en la petición',
      status: response.status,
      errors: error?.errors ?? null,
    } satisfies ApiError;
  }

  return json as ApiResponse<T>;
}

export const ApiServer = {
  get: <T>(endpoint: string, options?: Omit<ServerRequestOptions, 'body'>) =>
    apiRequest<T>('GET', endpoint, options),

  post: <T, B = unknown>(endpoint: string, body?: B, options?: ServerRequestOptions<B>) =>
    apiRequest<T, B>('POST', endpoint, {
      ...options,
      body,
    }),

  put: <T, B = unknown>(endpoint: string, body?: B, options?: ServerRequestOptions<B>) =>
    apiRequest<T, B>('PUT', endpoint, {
      ...options,
      body,
    }),

  patch: <T, B = unknown>(endpoint: string, body?: B, options?: ServerRequestOptions<B>) =>
    apiRequest<T, B>('PATCH', endpoint, {
      ...options,
      body,
    }),

  delete: <T>(endpoint: string, options?: Omit<ServerRequestOptions, 'body'>) =>
    apiRequest<T>('DELETE', endpoint, options),
};
