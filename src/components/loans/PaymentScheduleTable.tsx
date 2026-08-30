import { PaymentScheduleItem } from '@/types/loans/loanTypes';
import { formatCurrency, formatDate } from '@/utils/utlis';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';

export function PaymentScheduleTable({
  schedule,
}: {
  schedule: PaymentScheduleItem[];
}) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ overflowX: 'auto', maxHeight: 600 }}
    >
      <Table sx={{ minWidth: 720}} stickyHeader>
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
            <TableCell>#</TableCell>
            <TableCell>Fecha de pago</TableCell>
            <TableCell align="right">Cuota</TableCell>
            <TableCell align="right">Capital</TableCell>
            <TableCell align="right">Interés</TableCell>
            <TableCell align="right">Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((item) => (
            <TableRow
              key={item.paymentNumber}
              hover
              sx={{ '&:last-child td': { border: 0 } }}
            >
              <TableCell sx={{ color: 'text.secondary' }}>
                {item.paymentNumber}
              </TableCell>
              <TableCell>{formatDate(item.dueDate)}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.totalPayment)}
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {formatCurrency(item.principal)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: 'text.secondary' }}
              >
                {formatCurrency(item.interest)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(item.remainingBalance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
