import { API_BACKEND_URL } from '@/config/env';
import { HTTP_STATUS } from '@/constants/http-status';
import { ApiError, ApiResponse } from '@/lib/types';

export interface UploadOptions {
  credentials?: RequestCredentials;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export async function uploadClient<T>(
  endpoint: string,
  formData: FormData,
  options: UploadOptions = {},
): Promise<ApiResponse<T>> {
  const { credentials, signal, headers = {} } = options;

  let response: Response;

  try {
    response = await fetch(`${API_BACKEND_URL}/${endpoint}`, {
      method: 'POST',
      credentials,
      signal,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      body: formData,
    });
  } catch {
    throw {
      message: 'No se pudo conectar con el servidor',
      status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    } satisfies ApiError;
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const error = json as Partial<ApiError> | null;

    throw {
      message: error?.message ?? 'Error subiendo archivo',
      status: response.status,
      errors: error?.errors ?? null,
    } satisfies ApiError;
  }

  return json as ApiResponse<T>;
}
