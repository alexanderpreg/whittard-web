export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  const item = localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item);
}

export function setLocalStorage(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(key);
}
