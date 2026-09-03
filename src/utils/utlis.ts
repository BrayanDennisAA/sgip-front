export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 2) {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat('es-BO', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));
}