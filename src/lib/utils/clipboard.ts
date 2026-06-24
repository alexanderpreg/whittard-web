export async function copyTextToClipboard(text: string): Promise<boolean> {
  const value = text.trim();

  if (value.length === 0) return false;
  if (typeof navigator === 'undefined') return false;
  if (navigator.clipboard === undefined) return false;

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
