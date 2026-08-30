'use client';
import { SimulateFormValues } from '@/lib/schemas/loanSchemas';
import { Box, Stack, TextField, Button, CircularProgress } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { LoanTypeToggle } from './LoanTypeToggle';

interface Props {
  control: Control<SimulateFormValues>;
  errors: FieldErrors<SimulateFormValues>;
  isCalculating: boolean;
  onSubmit: (e: React.SyntheticEvent) => void;
}

export function LoanSimulateFields({
  control,
  errors,
  isCalculating,
  onSubmit,
}: Props) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
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
              helperText={errors.amount?.message ?? 'Entre $500 y $50,000'}
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
            <LoanTypeToggle value={field.value} onChange={field.onChange} />
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
  );
}
