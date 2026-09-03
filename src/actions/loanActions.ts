'use server';

import { BackendError } from '@/lib/httpRequest';
import { CURRENT_USER_ID } from '@/lib/session';
import { approveLoan, createLoan, rejectLoan } from '@/services/loansService';
import { ActionResult } from '@/types/httpTypes';
import { LoanResponse, LoanType } from '@/types/loans/loanTypes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createLoanAction(formData: FormData): Promise<void> {
  const amount = Number(formData.get('amount'));
  const term = Number(formData.get('term'));
  const loanType = (formData.get('loanType') as LoanType) ?? 'Fixed';
  const monthlyIncome = Number(formData.get('monthlyIncome') ?? 10000);
  
  let loan: LoanResponse;
  try {
    loan = await createLoan({
      userId: CURRENT_USER_ID,
      amount,
      term,
      loanType,
      monthlyIncome,
    });
  } catch (error) {
    const message =
      error instanceof BackendError
        ? error.message
        : 'Error al crear el préstamo.';
    redirect(`/loans/simulate?error=${encodeURIComponent(message)}`);
  }

  revalidatePath('/loans');
  redirect(`/loans/${loan.id}`);
}

export async function approveLoanAction(loanId: string): Promise<ActionResult> {
  try {
    await approveLoan(loanId);
  } catch (error) {
    const message =
      error instanceof BackendError
        ? error.message
        : 'No se pudo aprobar el préstamo.';
    return { success: false, error: message };
  }

  revalidatePath(`/loans/${loanId}`);
  revalidatePath('/loans');
  return { success: true };
}

export async function rejectLoanAction(loanId: string): Promise<ActionResult> {
  try {
    await rejectLoan(loanId);
  } catch (error) {
    const message =
      error instanceof BackendError
        ? error.message
        : 'No se pudo rechazar el préstamo.';
    return { success: false, error: message };
  }

  revalidatePath(`/loans/${loanId}`);
  revalidatePath('/loans');
  return { success: true };
}

