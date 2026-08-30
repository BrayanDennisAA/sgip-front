import { StatusBadge } from '@/components/badge/StatusBadge';
import { DataTable, DataTableColumn } from '@/components/datatable/DataTable';
import { NewTransactionButton } from '@/components/transactions/newTransactionButton';
import { TransactionFilters } from '@/components/transactions/transactionFilters';
import { listTransactions } from '@/services/transactionsService';
import {
  TransactionResponse,
  TransactionStatus,
  TransactionType,
} from '@/types/transactions/transactionsTypes';
import { formatCurrency, formatDateTime } from '@/utils/utlis';
import {
  Box,
  Typography
} from '@mui/material';

const TYPE_LABELS: Record<string, string> = {
  Disbursement: 'Desembolso',
  Payment: 'Pago',
  Transfer: 'Transferencia',
};

const columns: DataTableColumn<TransactionResponse>[] = [
  {
    key: 'type',
    header: 'Tipo',
    render: (tx) => TYPE_LABELS[tx.type] ?? tx.type,
  },
  {
    key: 'amount',
    header: 'Monto',
    align: 'right',
    render: (tx) => (
      <Box>
        {formatCurrency(tx.amount)}
      </Box>
    ),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (tx) => <StatusBadge status={tx.status} />,
  },
  {
    key: 'createdAt',
    header: 'Fecha',
    render: (tx) => (
      <Box sx={{ color: 'text.secondary' }}>{formatDateTime(tx.createdAt)}</Box>
    ),
  },
];

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const type = (await searchParams).type as TransactionType | undefined;
  const status = (await searchParams).status as TransactionStatus | undefined;
  const transactions = await listTransactions({
    type: type,
    status: status,
  });

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 28, fontWeight: 600 }}>
          Transacciones
        </Typography>
        <NewTransactionButton />
      </Box>

      <Box sx={{ mt: 3 }}>
        <TransactionFilters activeType={type} activeStatus={status} />
      </Box>

      <DataTable 
        columns={columns}
        rows={transactions}
        getRowKey={(tx) => tx.id}
        emptyMessage="No hay transacciones con estos filtros."
        maxHeight={650}
        stickyHeader
      />
    </Box>
  );
}
