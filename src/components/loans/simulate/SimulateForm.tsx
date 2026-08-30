'use client';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, Stack, Grid } from '@mui/material';
import { useLoanSimulation } from '@/hooks/useLoanSimulation';
import {
  SimulateFormValues,
  simulateLoanSchema,
} from '@/lib/schemas/loanSchemas';
import { LoanSimulateFields } from './LoanSimulateFields';
import { LoanRequestForm } from './LoanRequestForm';
import { SimulationResult } from './SimulationResult';

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

  const onCalculate = handleSubmit((values) => simulate(values));

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={3}>
            <LoanSimulateFields
              control={control as Control<SimulateFormValues>}
              errors={errors as FieldErrors<SimulateFormValues>}
              isCalculating={isCalculating}
              onSubmit={onCalculate}
            />
            {result && (
              <LoanRequestForm values={getValues() as SimulateFormValues} />
            )}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <SimulationResult result={result} error={simError} />
      </Grid>
    </Grid>
  );
}
