import { Chip } from '@mui/material';

const STATUS_MAP: Record<
  string,
  { label: string; color: 'warning' | 'success' | 'error' | 'info' | 'default' }
> = {
  Pending: { label: 'Pendiente', color: 'warning' },
  Approved: { label: 'Aprobado', color: 'success' },
  Active: { label: 'Activo', color: 'info' },
  Completed: { label: 'Completada', color: 'success' },
  Rejected: { label: 'Rechazado', color: 'error' },
  Failed: { label: 'Fallida', color: 'error' },
};

export function StatusBadge({ status }: { status: string }) {
  const { label, color } = STATUS_MAP[status] ?? {
    label: status,
    color: 'default' as const,
  };
  return <Chip label={label} color={color} size="small" variant="outlined" />;
}
