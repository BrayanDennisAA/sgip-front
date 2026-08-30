'use client';

import { Button, CircularProgress } from '@mui/material';
import { useFormStatus } from 'react-dom';

export function LoanRequestSubmitButton() {
  const { pending } = useFormStatus(); // lee el estado del <form> padre real

  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      disabled={pending}
      startIcon={
        pending ? <CircularProgress size={16} color="inherit" /> : null
      }
    >
      {pending ? 'Enviando solicitud…' : 'Solicitar préstamo'}
    </Button>
  );
}
