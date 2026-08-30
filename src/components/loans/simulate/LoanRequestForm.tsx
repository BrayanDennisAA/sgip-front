import { createLoanAction } from '@/actions/loanActions';
import { SimulateFormValues } from '@/lib/schemas/loanSchemas';
import { LoanRequestSubmitButton } from '../LoanRequestSubmitButton';

export function LoanRequestForm({ values }: { values: SimulateFormValues }) {
  return (
    <form action={createLoanAction}>
      <input type="hidden" name="amount" value={values.amount} />
      <input type="hidden" name="term" value={values.term} />
      <input type="hidden" name="loanType" value={values.loanType} />
      <input type="hidden" name="monthlyIncome" value={values.monthlyIncome} />
      <LoanRequestSubmitButton />
    </form>
  );
}
