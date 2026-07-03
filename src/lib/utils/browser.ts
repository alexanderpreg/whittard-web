export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function isClient(): boolean {
  return !isServer();
}

export function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
}
