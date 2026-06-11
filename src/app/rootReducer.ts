import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import { authReducer } from '@/features/auth/slices/authSlice';
import { userReducer } from '@/features/profile/slices/userSlice';
import { walletReducer } from '@/features/wallet/slices/walletSlice';
import { gameReducer } from '@/features/games/slices/gameSlice';
import { uiReducer } from '@/features/settings/slices/uiSlice';
import { settingsReducer } from '@/features/settings/slices/settingsSlice';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  user: userReducer,
  wallet: walletReducer,
  game: gameReducer,
  ui: uiReducer,
  settings: settingsReducer,
});
