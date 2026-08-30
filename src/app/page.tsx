import { Box, Button, Stack, Typography } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Link from '@/components/link/Link';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        margin: '0 auto',
        py: 4,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        Sistema de Gestión de Préstamos
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        Simulá un préstamo, revisá el cronograma de pagos completo antes de
        decidir, y hacé seguimiento de tus solicitudes y transacciones en un
        solo lugar.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          component={Link}
          href="/loans/simulate"
          variant="contained"
          size="large"
          startIcon={
            <LocalAtmIcon />
          }
        >
          Simular préstamo
        </Button>
        <Button component={Link} href="/loans" variant="outlined" size="large">
          Ver mis préstamos
        </Button>
      </Stack>
    </Box>
  );
}
