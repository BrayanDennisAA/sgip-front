'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import type { TransactionStatus, TransactionType } from '@/types/transactions/transactionsTypes';

interface Props {
  activeType?: TransactionType;
  activeStatus?: TransactionStatus;
}

export function TransactionFilters({ activeType, activeStatus }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(
    type: TransactionType | undefined,
    status: TransactionStatus | undefined,
  ) {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    router.push(`${pathname}${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 2 }}>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={activeType ?? 'all'}
        onChange={(_, value) =>
          navigate(value === 'all' ? undefined : value, activeStatus)
        }
      >
        <ToggleButton value="all">Todos los tipos</ToggleButton>
        <ToggleButton value="Disbursement">Desembolso</ToggleButton>
        <ToggleButton value="Payment">Pago</ToggleButton>
        <ToggleButton value="Transfer">Transferencia</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        size="small"
        exclusive
        value={activeStatus ?? 'all'}
        onChange={(_, value) =>
          navigate(activeType, value === 'all' ? undefined : value)
        }
      >
        <ToggleButton value="all">Todos los estados</ToggleButton>
        <ToggleButton value="Pending">Pendiente</ToggleButton>
        <ToggleButton value="Completed">Completada</ToggleButton>
        <ToggleButton value="Failed">Fallida</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
