import 'server-only';

import { httpRequest } from '@/lib/httpRequest';
import {
  CreateTransactionRequest,
  TransactionFilters,
  TransactionResponse,
} from '@/types/transactions/transactionsTypes';

export function createTransaction(
  idempotencyKey: string,
  payload: CreateTransactionRequest,
) {
  return httpRequest<TransactionResponse>('/api/transactions', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(payload),
  });
}

export function listTransactions(filters?: TransactionFilters) {
  const params = new URLSearchParams();
  if (filters?.type) params.set('type', filters.type);
  if (filters?.status)
    params.set(
      'status',
      filters.status,
    );
  const query = params.toString() ? `?${params.toString()}` : '';
  console.log(query)
  return httpRequest<TransactionResponse[]>(`/api/transactions${query}`, {
    method: 'GET',
  });
}

export function getTransaction(id: string) {
  return httpRequest<TransactionResponse>(`/api/transactions/${id}`, {
    method: 'GET',
  });
}
