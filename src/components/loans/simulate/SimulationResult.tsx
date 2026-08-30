import { SimulateLoanResponse } from '@/types/loans/loanTypes';
import { formatCurrency, formatPercentage } from '@/utils/utlis';
import { Box, Grid, Paper, Typography, Alert } from '@mui/material';
import { PaymentScheduleTable } from '../PaymentScheduleTable';

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography sx={{ fontSize: 22, fontWeight: 600, mt: 0.5 }}>
          {value}
        </Typography>
      </Paper>
    </Grid>
  );
}

interface Props {
  result: SimulateLoanResponse | null;
  error: string | null;
}

export function SimulationResult({ result, error }: Props) {
  if (error) return <Alert severity="error">{error}</Alert>;

  if (!result) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 6,
          textAlign: 'center',
          borderStyle: 'dashed',
          color: 'text.secondary',
        }}
      >
        Completá el formulario y presioná «Calcular» para ver el cronograma.
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <SummaryCard
          label="Cuota mensual"
          value={formatCurrency(result.monthlyPayment)}
        />
        <SummaryCard label="TEA" value={formatPercentage(result.teaRate)} />
        <SummaryCard label="TEM" value={formatPercentage(result.temRate, 3)} />
      </Grid>
      <PaymentScheduleTable schedule={result.schedule} />
    </Box>
  );
}
