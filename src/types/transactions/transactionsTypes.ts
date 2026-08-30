export type TransactionType = 'Disbursement' | 'Payment' | 'Transfer';
export type TransactionStatus = 'Pending' | 'Completed' | 'Failed';

export interface CreateTransactionRequest {
  type: number;
  amount: number;
  loanId?: string;
  description?: string;
}

export interface TransactionResponse {
  id: string;
  idempotencyKey: string;
  type: string;
  amount: number;
  status: string;
  loanId?: string;
  description?: string;
  createdAt: string;
  wasDeduplicated: boolean;
}

export interface TransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
}