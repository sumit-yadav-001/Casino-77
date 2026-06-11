export interface WalletBalance {
  total: number;
  available: number;
  bonus: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'bonus' | 'bet' | 'win' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method?: string;
  reference?: string;
  description: string;
  createdAt: string;
}

export interface DepositRequest {
  amount: number;
  method: string;
  currency: string;
}

export interface WithdrawRequest {
  amount: number;
  method: string;
  accountDetails: Record<string, string>;
}

export interface TransactionsFilter {
  type?: Transaction['type'];
  status?: Transaction['status'];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}
