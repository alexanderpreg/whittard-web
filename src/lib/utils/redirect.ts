export function resolveSafeRedirect(redirect: string | null | undefined, fallback = '/'): string {
  if (!redirect) return fallback;
  if (!redirect.startsWith('/')) return fallback;
  if (redirect.startsWith('//')) return fallback; //url externas protege
  return redirect;
}
