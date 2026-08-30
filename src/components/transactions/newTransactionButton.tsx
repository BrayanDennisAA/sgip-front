'use client';
import { useRef } from 'react';
import { Button, Alert, Stack } from '@mui/material';
import { useServerAction } from '@/hooks/useServerAction';
import { createTransactionAction } from '@/actions/transactionActions';

export function NewTransactionButton() {
  const idempotencyKeyRef = useRef<string>(crypto.randomUUID());

  const { run, isPending, error } = useServerAction(createTransactionAction, {
    onSuccess: () => {
      idempotencyKeyRef.current = crypto.randomUUID(); // solo tras éxito
    },
  });

  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Button
        variant="contained"
        disabled={isPending}
        onClick={() =>
          run(idempotencyKeyRef.current, {
            type: 1,
            amount: Math.round((Math.random() * 400 + 50) * 100) / 100,
            description: 'Pago de prueba (simulado desde UI)',
          })
        }
      >
        {isPending ? 'Creando…' : 'Simular pago de prueba'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
