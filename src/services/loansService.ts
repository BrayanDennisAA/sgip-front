import 'server-only';

import { httpRequest } from '@/lib/httpRequest';
import {
    CreateLoanRequest,
    LoanDetailResponse,
    LoanResponse,
    SimulateLoanRequest,
    SimulateLoanResponse,
} from '@/types/loans/loanTypes';

export function simulateLoan(payload: SimulateLoanRequest) {
  return httpRequest<SimulateLoanResponse>('/api/loans/simulate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function createLoan(payload: CreateLoanRequest) {
  return httpRequest<LoanResponse>('/api/loans', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listLoans(userId?: string) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  return httpRequest<LoanResponse[]>(`/api/loans${query}`, { method: 'GET' });
}

export function getLoan(id: string) {
  return httpRequest<LoanResponse>(`/api/loans/${id}`, { method: 'GET' });
}

export function getLoanSchedule(id: string) {
  return httpRequest<LoanDetailResponse>(`/api/loans/${id}/schedule`, {
    method: 'GET',
  });
}

export function approveLoan(id: string) {
  return httpRequest<LoanResponse>(`/api/loans/${id}/approve`, {
    method: 'PATCH',
  });
}

export function rejectLoan(id: string) {
  return httpRequest<LoanResponse>(`/api/loans/${id}/reject`, {
    method: 'PATCH',
  });
}
