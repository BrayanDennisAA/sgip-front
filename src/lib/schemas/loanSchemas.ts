import { z } from 'zod';

export const simulateLoanSchema = z.object({
  amount: z.coerce
    .number({ error: 'Ingresá un monto válido' })
    .min(500, 'El monto mínimo es $500')
    .max(50_000, 'El monto máximo es $50,000'),
  term: z
    .coerce
    .number({ error: 'Ingresá un plazo válido' })
    .int('El plazo debe ser un número entero de meses')
    .min(6, 'El plazo mínimo es 6 meses')
    .max(60, 'El plazo máximo es 60 meses'),
  loanType: z.enum(['Fixed', 'Decreasing'], {
    error: 'Seleccioná un tipo de préstamo válido',
  }),
  monthlyIncome: z
    .coerce
    .number({ error: 'Ingresá tus ingresos mensuales' })
    .positive('Los ingresos deben ser mayores a 0'),
});

export type SimulateFormValues = z.infer<typeof simulateLoanSchema>;
