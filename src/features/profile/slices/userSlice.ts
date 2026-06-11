import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '@/types/user.types';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProfile, clearProfile, setUserLoading } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectProfile = (state: { user: UserState }) => state.user.profile;
