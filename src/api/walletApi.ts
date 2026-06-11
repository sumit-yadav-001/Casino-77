import { baseApi } from './baseApi';
import type { WalletBalance, Transaction, TransactionsFilter, TransactionsResponse, DepositRequest, WithdrawRequest } from '@/types/wallet.types';

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<WalletBalance, void>({
      query: () => '/wallet/balance',
      providesTags: ['Wallet'],
    }),

    getTransactions: builder.query<TransactionsResponse, TransactionsFilter>({
      query: (params) => ({
        url: '/wallet/transactions',
        params,
      }),
      providesTags: ['Transactions'],
    }),

    deposit: builder.mutation<Transaction, DepositRequest>({
      query: (data) => ({
        url: '/wallet/deposit',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet', 'Transactions'],
    }),

    withdraw: builder.mutation<Transaction, WithdrawRequest>({
      query: (data) => ({
        url: '/wallet/withdraw',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wallet', 'Transactions'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useDepositMutation,
  useWithdrawMutation,
} = walletApi;
