import { StatusBadge } from '@/components/badge/StatusBadge';
import { DataTable, DataTableColumn } from '@/components/datatable/DataTable';
import Link from '@/components/link/Link';
import { listLoans } from '@/services/loansService';
import { LoanResponse } from '@/types/loans/loanTypes';
import { formatCurrency, formatPercentage } from '@/utils/utlis';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { Box, Button, Typography } from '@mui/material';

const columns: DataTableColumn<LoanResponse>[] = [
  {
    key: 'id',
    header: 'ID',
    render: (loan) => (
      <Typography
        component={Link}
        href={`/loans/${loan.id}`}
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        {loan.id.slice(0, 8)}…
      </Typography>
    ),
  },
  {
    key: 'amount',
    header: 'Monto',
    align: 'right',
    render: (loan) => <Box>{formatCurrency(loan.amount)}</Box>,
  },
  { key: 'term', header: 'Plazo', render: (loan) => `${loan.term} meses` },
  {
    key: 'interestRate',
    header: 'Tea',
    align: 'right',
    render: (loan) => <Box>{formatPercentage(loan.interestRate)}</Box>,
  },
  {
    key: 'monthlyPayment',
    header: 'Cuota',
    align: 'right',
    render: (loan) => <Box>{formatCurrency(loan.monthlyPayment)}</Box>,
  },
  {
    key: 'status',
    header: 'Estado',
    render: (loan) => <StatusBadge status={loan.status} />,
  },
];

export default async function LoansPage() {
  const loans: LoanResponse[] = await listLoans();
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Mis préstamos
        </Typography>
        <Button
          component={Link}
          href="/loans/simulate"
          variant="contained"
          endIcon={<PostAddOutlinedIcon />}
        >
          Nueva simulación
        </Button>
      </Box>

      <DataTable
        columns={columns}
        rows={loans}
        getRowKey={(loan) => loan.id}
        emptyMessage="No cuentas con préstamos. Empezá simulando uno."
      />
    </Box>
  );
}
