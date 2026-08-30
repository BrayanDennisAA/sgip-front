'use client';
import { approveLoanAction, rejectLoanAction } from '@/actions/loanActions';
import { useServerAction } from '@/hooks/useServerAction';
import { Button, Alert, Stack } from '@mui/material';

export function LoanApprovalActions({ loanId }: { loanId: string }) {
  const approve = useServerAction(approveLoanAction);
  const reject = useServerAction(rejectLoanAction);
  const error = approve.error ?? reject.error;

  return (
    <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
      <Stack direction="row" spacing={1.5}>
        <Button
          variant="contained"
          disabled={approve.isPending}
          onClick={() => approve.run(loanId)}
        >
          {approve.isPending ? 'Procesando…' : 'Aprobar'}
        </Button>
        <Button
          color="error"
          variant="outlined"
          disabled={reject.isPending}
          onClick={() => reject.run(loanId)}
        >
          Rechazar
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
