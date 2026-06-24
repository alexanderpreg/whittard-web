export function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function isTouchDevice(): boolean {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
}
