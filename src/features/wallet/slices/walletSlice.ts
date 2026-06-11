import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WalletBalance, Transaction } from '@/types/wallet.types';

interface WalletState {
  balance: WalletBalance;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: {
    total: 154320.50, // default dummy balance for immersive feel
    available: 132320.50,
    bonus: 22000.00,
    currency: 'INR',
  },
  transactions: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<WalletBalance>) => {
      state.balance = action.payload;
    },
    updateBalance: (state, action: PayloadAction<Partial<WalletBalance>>) => {
      state.balance = { ...state.balance, ...action.payload };
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      if (action.payload.type === 'deposit') {
        state.balance.total += action.payload.amount;
        state.balance.available += action.payload.amount;
      } else if (action.payload.type === 'withdraw') {
        state.balance.total -= action.payload.amount;
        state.balance.available -= action.payload.amount;
      }
    },
    setWalletLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWalletError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    depositSuccess: (state, action: PayloadAction<{ amount: number }>) => {
      state.balance.total += action.payload.amount;
      state.balance.available += action.payload.amount;
    },
    withdrawSuccess: (state, action: PayloadAction<{ amount: number }>) => {
      state.balance.total -= action.payload.amount;
      state.balance.available -= action.payload.amount;
    },
  },
});

export const {
  setBalance,
  updateBalance,
  setTransactions,
  addTransaction,
  setWalletLoading,
  setWalletError,
  depositSuccess,
  withdrawSuccess,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;

export const selectWallet = (state: { wallet: WalletState }) => state.wallet;
export const selectBalance = (state: { wallet: WalletState }) => state.wallet.balance;
