import { HTTP_STATUS } from '@/constants/http-status';

export async function parseResponse<T>(response: Response): Promise<T | null> {
  if (response.status === HTTP_STATUS.NO_CONTENT) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
