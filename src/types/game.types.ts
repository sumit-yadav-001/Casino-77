export interface GameProvider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  gamesCount: number;
  isActive: boolean;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  providerId: string;
  providerName: string;
  category: GameCategory;
  type: GameType;
  isFavorite: boolean;
  isNew: boolean;
  isPopular: boolean;
  rtp?: number;
  minBet?: number;
  maxBet?: number;
}

export type GameCategory = 'live-casino' | 'slots' | 'crash' | 'table' | 'arcade' | 'fishing' | 'sports';

export type GameType = 'real' | 'demo';

export interface GameCategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  subtitle: string;
  image: string;
  gamesCount: number;
}

export interface GamesFilter {
  category?: GameCategory;
  providerId?: string;
  search?: string;
  sortBy?: 'popular' | 'new' | 'name' | 'rtp';
  page?: number;
  limit?: number;
}

export interface GamesResponse {
  games: Game[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
