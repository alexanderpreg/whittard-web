export type DateValue = string | Date | null | undefined;

export function formatDate(date: DateValue): string {
  if (!date) return '';

  return new Date(date).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(date: DateValue): string {
  if (!date) return '';

  return new Date(date).toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(date: DateValue): string {
  if (!date) return '';

  return new Date(date).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    // hourCycle: 'h24',
    // hour12: false,
  });
}
