export const ROUTES = {
  // Public
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Protected - Dashboard
  DASHBOARD: '/dashboard',

  // Protected - Games
  CASINO: '/casino',
  SLOTS: '/slots',
  LIVE_CASINO: '/live-casino',
  PROVIDERS: '/providers',
  FAVORITES: '/favorites',

  // Protected - Wallet
  WALLET: '/wallet',
  DEPOSIT: '/deposit',
  WITHDRAW: '/withdraw',
  TRANSACTIONS: '/transactions',

  // Protected - Bonus
  BONUS: '/bonus',
  REWARDS: '/rewards',

  // Protected - Profile
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
  KYC: '/kyc',

  // Protected - Support
  SUPPORT: '/support',
  TICKETS: '/tickets',

  // Protected - Referral
  REFERRAL: '/referral',
  LEADERBOARD: '/leaderboard',

  // Error
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
