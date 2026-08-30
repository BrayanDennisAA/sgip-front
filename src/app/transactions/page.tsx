import { StatusBadge } from '@/components/badge/StatusBadge';
import { NewTransactionButton } from '@/components/transactions/newTransactionButton';
import { TransactionFilters } from '@/components/transactions/transactionFilters';
import { listTransactions } from '@/services/transactionsService';
import {
  TransactionStatus,
  TransactionType,
} from '@/types/transactions/transactionsTypes';
import { formatCurrency, formatDateTime } from '@/utils/utlis';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';

const TYPE_LABELS: Record<string, string> = {
  Disbursement: 'Desembolso',
  Payment: 'Pago',
  Transfer: 'Transferencia',
};

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

      {transactions.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            mt: 4,
            p: 6,
            textAlign: 'center',
            borderStyle: 'dashed',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">
            No hay transacciones con estos filtros.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    bgcolor: 'background.default',
                    fontSize: 12,
                    textTransform: 'uppercase',
                  },
                }}
              >
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  hover
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell>{TYPE_LABELS[tx.type] ?? tx.type}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {formatDateTime(tx.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
