import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Game, GameCategory } from '@/types/game.types';
import { storage } from '@/utils/storage';

interface GameState {
  favorites: string[]; // List of game slugs or IDs
  searchQuery: string;
  selectedCategory: GameCategory | 'all';
  selectedProviderId: string | 'all';
  selectedGame: Game | null;
}

const FAVORITES_KEY = 'c555_favorites';

const initialState: GameState = {
  favorites: storage.get<string[]>(FAVORITES_KEY) || [],
  searchQuery: '',
  selectedCategory: 'all',
  selectedProviderId: 'all',
  selectedGame: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const index = state.favorites.indexOf(gameId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(gameId);
      }
      storage.set(FAVORITES_KEY, state.favorites);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<GameCategory | 'all'>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProviderId: (state, action: PayloadAction<string | 'all'>) => {
      state.selectedProviderId = action.payload;
    },
    setSelectedGame: (state, action: PayloadAction<Game | null>) => {
      state.selectedGame = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedProviderId = 'all';
    },
  },
});

export const {
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  setSelectedProviderId,
  setSelectedGame,
  resetFilters,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;

export const selectGame = (state: { game: GameState }) => state.game;
export const selectFavorites = (state: { game: GameState }) => state.game.favorites;
export const selectSearchQuery = (state: { game: GameState }) => state.game.searchQuery;
export const selectSelectedCategory = (state: { game: GameState }) => state.game.selectedCategory;
export const selectSelectedProviderId = (state: { game: GameState }) => state.game.selectedProviderId;
export const selectSelectedGame = (state: { game: GameState }) => state.game.selectedGame;
export const selectIsFavorite = (state: { game: GameState }, gameId: string) => 
  state.game.favorites.includes(gameId);
