'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useLoanSimulation } from '@/hooks/useLoanSimulation';
import { simulateLoanSchema } from '@/lib/schemas/loanSchemas';
import { createLoanAction } from '@/actions/loanActions';
import { formatCurrency, formatPercentage } from '@/utils/utlis';
import { PaymentScheduleTable } from './PaymentScheduleTable';
import { LoanRequestSubmitButton } from './LoanRequestSubmitButton';

export function SimulateForm() {
  const {
    simulate,
    result,
    error: simError,
    isCalculating,
  } = useLoanSimulation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(simulateLoanSchema),
    mode: 'onBlur',
    defaultValues: {
      amount: 5000,
      term: 12,
      loanType: 'Fixed',
      monthlyIncome: 10000,
    },
  });

  const onCalculate = handleSubmit(async (values) => {
    await simulate(values);
  });

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Formulario de simulación: valida y calcula */}
            <Box component="form" onSubmit={onCalculate} noValidate>
              <Stack spacing={3}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monto solicitado"
                      type="number"
                      fullWidth
                      error={!!errors.amount}
                      helperText={
                        errors.amount?.message ?? 'Entre $500 y $50,000'
                      }
                    />
                  )}
                />

                <Controller
                  name="term"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Plazo (meses)"
                      type="number"
                      fullWidth
                      error={!!errors.term}
                      helperText={errors.term?.message ?? 'Entre 6 y 60 meses'}
                    />
                  )}
                />

                <Controller
                  name="loanType"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Tipo de cuota
                      </Typography>
                      <ToggleButtonGroup
                        exclusive
                        fullWidth
                        value={field.value}
                        onChange={(_, value) => value && field.onChange(value)}
                      >
                        <ToggleButton value="Fixed">Cuota fija</ToggleButton>
                        <ToggleButton value="Decreasing">
                          Cuota decreciente
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  )}
                />

                <Controller
                  name="monthlyIncome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Ingresos mensuales"
                      type="number"
                      fullWidth
                      error={!!errors.monthlyIncome}
                      helperText={
                        errors.monthlyIncome?.message ??
                        'Para validar capacidad de pago'
                      }
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isCalculating}
                  startIcon={
                    isCalculating ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : null
                  }
                >
                  {isCalculating ? 'Calculando…' : 'Calcular'}
                </Button>
              </Stack>
            </Box>

            {/* Formulario de solicitud: solo aparece si ya se calculó */}
            {result && (
              <form action={createLoanAction}>
                <input
                  type="hidden"
                  name="amount"
                  value={getValues('amount') as number}
                />
                <input
                  type="hidden"
                  name="term"
                  value={getValues('term') as number}
                />
                <input
                  type="hidden"
                  name="loanType"
                  value={getValues('loanType')}
                />
                <input
                  type="hidden"
                  name="monthlyIncome"
                  value={getValues('monthlyIncome') as number}
                />
                <LoanRequestSubmitButton />
              </form>
            )}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        {simError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {simError}
          </Alert>
        )}

        {!simError && !result && (
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
        )}

        {result && (
          <Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 4 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Cuota mensual
                  </Typography>
                  <Typography sx={{ fontSize: 22, fontWeight: 600, mt: 0.5 }}>
                    {formatCurrency(result.monthlyPayment)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    TEA
                  </Typography>
                  <Typography sx={{ fontSize: 22, fontWeight: 600, mt: 0.5 }}>
                    {formatPercentage(result.teaRate)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    TEM
                  </Typography>
                  <Typography sx={{ fontSize: 22, fontWeight: 600, mt: 0.5 }}>
                    {formatPercentage(result.temRate, 3)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <PaymentScheduleTable schedule={result.schedule} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
