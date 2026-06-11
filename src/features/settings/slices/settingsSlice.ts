import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@/utils/storage';

interface SettingsState {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
}

const SETTINGS_KEY = 'c555_settings';

const initialState: SettingsState = storage.get<SettingsState>(SETTINGS_KEY) || {
  soundEnabled: true,
  notificationsEnabled: true,
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
      storage.set(SETTINGS_KEY, state);
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
      storage.set(SETTINGS_KEY, state);
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      storage.set(SETTINGS_KEY, state);
    },
  },
});

export const { toggleSound, toggleNotifications, setLanguage } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export const selectSettings = (state: { settings: SettingsState }) => state.settings;
export const selectSoundEnabled = (state: { settings: SettingsState }) => state.settings.soundEnabled;
export const selectNotificationsEnabled = (state: { settings: SettingsState }) => state.settings.notificationsEnabled;
export const selectLanguage = (state: { settings: SettingsState }) => state.settings.language;
