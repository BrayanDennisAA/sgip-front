import { PaymentScheduleItem } from '@/types/loans/loanTypes';
import { formatCurrency, formatDate } from '@/utils/utlis';
import {
  Box
} from '@mui/material';
import { DataTable, DataTableColumn } from '../datatable/DataTable';

const columns: DataTableColumn<PaymentScheduleItem>[] = [
  {
    key: 'n',
    header: '#',
    render: (p) => (
      <Box sx={{ color: 'text.secondary' }}>{p.paymentNumber}</Box>
    ),
  },
  {
    key: 'date',
    header: 'Fecha de pago',
    render: (p) => formatDate(p.dueDate),
  },
  {
    key: 'total',
    header: 'Cuota',
    align: 'right',
    render: (p) => formatCurrency(p.totalPayment),
  },
  {
    key: 'principal',
    header: 'Capital',
    align: 'right',
    render: (p) => formatCurrency(p.principal),
  },
  {
    key: 'interest',
    header: 'Interés',
    align: 'right',
    render: (p) => formatCurrency(p.interest),
  },
  {
    key: 'balance',
    header: 'Saldo',
    align: 'right',
    render: (p) => formatCurrency(p.remainingBalance),
  },
];

export function PaymentScheduleTable({
  schedule,
}: {
  schedule: PaymentScheduleItem[];
}) {
  return (
    <DataTable
      columns={columns}
      rows={schedule}
      getRowKey={(p) => p.paymentNumber}
      emptyMessage="No hay pagos programados."
      minWidth={720}
      maxHeight={600}
      stickyHeader
    />
  );
}
