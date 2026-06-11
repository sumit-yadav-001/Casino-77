import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ScrollToTop } from '@/components/shared/ScrollToTop';

/* ── Page-level lazy imports ─────────────────────────── */

// Auth
const LoginPage          = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage         = lazy(() => import('@/pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));

// Home / Dashboard
const HomePage           = lazy(() => import('@/pages/dashboard/HomePage'));

// Games
const CasinoPage         = lazy(() => import('@/pages/games/CasinoPage'));
const SlotsPage          = lazy(() => import('@/pages/games/SlotsPage'));
const LiveCasinoPage     = lazy(() => import('@/pages/games/LiveCasinoPage'));
const ProvidersPage      = lazy(() => import('@/pages/games/ProvidersPage'));
const FavoritesPage      = lazy(() => import('@/pages/games/FavoritesPage'));

// Wallet
const WalletPage         = lazy(() => import('@/pages/wallet/WalletPage'));
const DepositPage        = lazy(() => import('@/pages/wallet/DepositPage'));
const WithdrawPage       = lazy(() => import('@/pages/wallet/WithdrawPage'));
const TransactionsPage   = lazy(() => import('@/pages/wallet/TransactionsPage'));

// Bonus / Rewards
const BonusPage          = lazy(() => import('@/pages/bonus/BonusPage'));

// Profile
const ProfilePage        = lazy(() => import('@/pages/profile/ProfilePage'));
const ChangePasswordPage = lazy(() => import('@/pages/profile/ChangePasswordPage'));
const KycPage            = lazy(() => import('@/pages/profile/KycPage'));

// Support
const SupportPage        = lazy(() => import('@/pages/support/SupportPage'));
const TicketsPage        = lazy(() => import('@/pages/support/TicketsPage'));

/* ── Inline fallback ─────────────────────────────────── */
function PageLoader() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent border-yellow-500 animate-spin" />
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Loading…</p>
      </div>
    </div>
  );
}

/* ── App ─────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public: auth pages ─────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN}          element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP}         element={<SignupPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          </Route>

          {/* ── Protected: main dashboard shell ─────────── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD}       element={<HomePage />} />

              {/* Games */}
              <Route path={ROUTES.CASINO}          element={<CasinoPage />} />
              <Route path={ROUTES.SLOTS}           element={<SlotsPage />} />
              <Route path={ROUTES.LIVE_CASINO}     element={<LiveCasinoPage />} />
              <Route path={ROUTES.PROVIDERS}       element={<ProvidersPage />} />
              <Route path={ROUTES.FAVORITES}       element={<FavoritesPage />} />

              {/* Wallet */}
              <Route path={ROUTES.WALLET}          element={<WalletPage />} />
              <Route path={ROUTES.DEPOSIT}         element={<DepositPage />} />
              <Route path={ROUTES.WITHDRAW}        element={<WithdrawPage />} />
              <Route path={ROUTES.TRANSACTIONS}    element={<TransactionsPage />} />

              {/* Bonus */}
              <Route path={ROUTES.BONUS}           element={<BonusPage />} />

              {/* Profile */}
              <Route path={ROUTES.PROFILE}         element={<ProfilePage />} />
              <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
              <Route path={ROUTES.KYC}             element={<KycPage />} />

              {/* Support */}
              <Route path={ROUTES.SUPPORT}         element={<SupportPage />} />
              <Route path={ROUTES.TICKETS}         element={<TicketsPage />} />
            </Route>
          </Route>

          {/* ── Default redirect + 404 ──────────────────── */}
          <Route path="/"  element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="*"  element={<Navigate to={ROUTES.LOGIN} replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
