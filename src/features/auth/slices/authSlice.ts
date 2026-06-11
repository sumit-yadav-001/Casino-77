import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/auth.types';
import { storage, STORAGE_KEYS } from '@/utils/storage';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: storage.get<User>(STORAGE_KEYS.USER),
  accessToken: storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),
  refreshToken: storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN),
  isAuthenticated: !!storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      storage.set(STORAGE_KEYS.USER, action.payload.user);
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
    },

    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.set(STORAGE_KEYS.USER, action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      storage.remove(STORAGE_KEYS.USER);
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    },
  },
});

export const { setCredentials, setTokens, setUser, setLoading, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
