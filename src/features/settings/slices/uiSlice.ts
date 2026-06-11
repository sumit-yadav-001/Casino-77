import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
  isMobileDrawerOpen: boolean;
  activeModal: string | null; // e.g. 'deposit' | 'withdraw' | 'login'
}

const initialState: UiState = {
  isSidebarOpen: true,
  isMobileDrawerOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleMobileDrawer: (state) => {
      state.isMobileDrawerOpen = !state.isMobileDrawerOpen;
    },
    setMobileDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileDrawerOpen = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileDrawer,
  setMobileDrawerOpen,
  setActiveModal,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export const selectUi = (state: { ui: UiState }) => state.ui;
export const selectIsSidebarOpen = (state: { ui: UiState }) => state.ui.isSidebarOpen;
export const selectIsMobileDrawerOpen = (state: { ui: UiState }) => state.ui.isMobileDrawerOpen;
export const selectActiveModal = (state: { ui: UiState }) => state.ui.activeModal;
