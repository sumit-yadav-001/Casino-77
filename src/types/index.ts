export type { User, LoginRequest, SignupRequest, AuthResponse, OtpRequest, OtpVerifyRequest, TokenRefreshRequest, TokenRefreshResponse } from './auth.types';
export type { Game, GameProvider, GameCategory, GameType, GameCategoryInfo, GamesFilter, GamesResponse } from './game.types';
export type { WalletBalance, Transaction, DepositRequest, WithdrawRequest, TransactionsFilter, TransactionsResponse } from './wallet.types';
export type { UserProfile, SupportTicket, ReferralInfo, LeaderboardEntry } from './user.types';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
