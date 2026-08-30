import Link from '@/components/link/Link';
import { listLoans } from '@/services/loansService';
import { LoanResponse } from '@/types/loans/loanTypes';
import { formatCurrency, formatPercentage } from '@/utils/utlis';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { StatusBadge } from '@/components/badge/StatusBadge';

export default async function LoansPage() {
  const loans: LoanResponse[] = await listLoans();
  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Mis préstamos
        </Typography>
        <Button
          component={Link}
          href="/loans/simulate"
          variant="contained"
          endIcon={<PostAddOutlinedIcon />}
        >
          Nueva simulación
        </Button>
      </Box>

      {loans.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            mt: 4,
            p: 6,
            textAlign: 'center',
            borderStyle: 'dashed',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">
            Todavía no tenés préstamos. Empezá simulando uno.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    bgcolor: 'background.default',
                    fontSize: 12,
                    textTransform: 'uppercase',
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Plazo</TableCell>
                <TableCell align="right">Tea</TableCell>
                <TableCell align="right">Cuota</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => (
                <TableRow
                  key={loan.id}
                  hover
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell>
                    <Typography
                      component={Link}
                      href={`/loans/${loan.id}`}
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {loan.id.slice(0, 8)}…
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(loan.amount)}
                  </TableCell>
                  <TableCell>{loan.term} meses</TableCell>
                  <TableCell align="right">
                    {formatPercentage(loan.interestRate)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(loan.monthlyPayment)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={loan.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
