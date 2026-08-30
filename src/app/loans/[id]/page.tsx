import { StatusBadge } from '@/components/badge/StatusBadge';
import { LoanApprovalActions } from '@/components/loans/LoanApprovalActions';
import { PaymentScheduleTable } from '@/components/loans/PaymentScheduleTable';
import { BackendError } from '@/lib/httpRequest';
import { getLoanSchedule } from '@/services/loansService';
import { formatCurrency, formatPercentage } from '@/utils/utlis';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { notFound } from 'next/navigation';

async function LoanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  let loan;
  try {
    const { id } = await params;
    loan = await getLoanSchedule(id);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) notFound();
    throw error;
  }
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color='textSecondary'
            sx={{
              fontSize: 12,
              mb: 1,
            }}
          >
            {loan.id}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: 28, mt: 0.5, fontWeight: 600 }}>
            {formatCurrency(loan.amount)} · {loan.term} meses
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mt: 1.5, alignItems: 'center' }}
          >
            <StatusBadge status={loan.status} />
            <Chip
              size="small"
              variant="outlined"
              label={
                loan.loanType === 'Fixed' ? 'Cuota fija' : 'Cuota decreciente'
              }
            />
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              TEA {formatPercentage(loan.interestRate)}
            </Typography>
          </Stack>
        </Box>

        {loan.status === 'Pending' && <LoanApprovalActions loanId={loan.id} />}
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}
        >
          Cronograma de pagos
        </Typography>
        <PaymentScheduleTable schedule={loan.schedule} />
      </Box>
    </Box>
  );
}

export default LoanDetailPage;
