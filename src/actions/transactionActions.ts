'use server';

import { BackendError } from '@/lib/httpRequest';
import { createTransaction } from '@/services/transactionsService';
import { ActionResult } from '@/types/httpTypes';
import {
  CreateTransactionRequest,
  TransactionResponse,
} from '@/types/transactions/transactionsTypes';
import { revalidatePath } from 'next/cache';

export async function createTransactionAction(
  idempotencyKey: string,
  payload: CreateTransactionRequest,
): Promise<ActionResult<TransactionResponse>> {
  try {
    const transaction = await createTransaction(idempotencyKey, payload);
    revalidatePath('/transactions');
    return { success: true, data: transaction };
  } catch (error) {
    const message =
      error instanceof BackendError
        ? error.message
        : 'No se pudo crear la transacción.';
    return { success: false, error: message };
  }
}
