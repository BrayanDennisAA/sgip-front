export type LoanType = 'Fixed' | 'Decreasing';
export type LoanStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active';

export interface PaymentScheduleItem {
  paymentNumber: number;
  dueDate: string;
  totalPayment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  status: string;
}

export interface SimulateLoanRequest {
  amount: number;
  term: number;
  loanType: LoanType;
}

export interface SimulateLoanResponse {
  amount: number;
  term: number;
  teaRate: number;
  temRate: number;
  loanType: string;
  monthlyPayment: number;
  schedule: PaymentScheduleItem[];
}

export interface CreateLoanRequest {
  userId: string;
  amount: number;
  term: number;
  loanType: number;
  monthlyIncome: number;
}

export interface LoanResponse {
  id: string;
  userId: string;
  amount: number;
  term: number;
  interestRate: number;
  loanType: string;
  status: string;
  monthlyPayment: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoanDetailResponse extends LoanResponse {
  schedule: PaymentScheduleItem[];
}
