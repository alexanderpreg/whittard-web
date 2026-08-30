import { HTTP_STATUS } from '@/constants/http-status';

export function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status: number }).status === HTTP_STATUS.NOT_FOUND
  );
}
