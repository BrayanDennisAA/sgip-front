import { SimulateForm } from '@/components/loans/simulate/SimulateForm';
import { Box, Typography, Alert } from '@mui/material';

export default async function SimulatePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const error = (await searchParams).error;

  return (
    <Box sx={{ maxWidth: '75%', margin: '0 auto', py: 4 }}>
      <Typography variant="h3" sx={{ fontSize: 28, fontWeight: 600, mb: 1 }}>
        Simular préstamo
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        Ajustá los valores del formulario para ver el cronograma.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 4 }}>
        <SimulateForm />
      </Box>
    </Box>
  );
}
