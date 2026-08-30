'use client';
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/loans/simulate', label: 'Simular' },
  { href: '/loans', label: 'Mis préstamos' },
  { href: '/transactions', label: 'Transacciones' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 600,
              color: 'text.primary',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            SGIP
          </Typography>

          <Stack direction="row" spacing={3}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Box
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    fontSize: 14,
                    textDecoration: 'none',
                    color: active ? 'primary.main' : 'text.primary',
                    fontWeight: active ? 600 : 400,
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
