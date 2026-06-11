import type { GameCategoryInfo } from '@/types/game.types';

export const GAME_CATEGORIES: GameCategoryInfo[] = [
  {
    id: '1',
    name: 'Live Casino',
    slug: 'live-casino',
    description: 'Experience the thrill of real-time gaming with professional dealers in our luxury studio.',
    subtitle: 'Elite Dealers • VIP Tables',
    image: '/images/live-casino-banner.jpg',
    gamesCount: 150,
  },
  {
    id: '2',
    name: 'Slot Game',
    slug: 'slots',
    description: 'Spin your way to fortune with our collection of high-RTP premium slot games.',
    subtitle: 'Mega Jackpots • 3000+ Games',
    image: '/images/slots-banner.jpg',
    gamesCount: 3000,
  },
  {
    id: '3',
    name: 'Crash',
    slug: 'crash',
    description: 'Crash is one of the most exciting and fast-paced casino games where timing is everything. In this game, a multiplier starts increasing from 1x and keeps rising higher and higher. Your goal is to cash out before the game crashes.',
    subtitle: 'Fast Paced • High Rewards',
    image: '/images/crash-banner.jpg',
    gamesCount: 25,
  },
  {
    id: '4',
    name: 'Table Games',
    slug: 'table',
    description: 'Classic table games including Blackjack, Roulette, Baccarat and Poker.',
    subtitle: 'Classic • Strategic',
    image: '/images/table-banner.jpg',
    gamesCount: 80,
  },
  {
    id: '5',
    name: 'Arcade',
    slug: 'arcade',
    description: 'Fun and exciting arcade-style games for quick entertainment.',
    subtitle: 'Fun • Quick Wins',
    image: '/images/arcade-banner.jpg',
    gamesCount: 45,
  },
];

export const CRASH_GAMES = [
  {
    id: 'crash-1',
    name: 'Crash Goal',
    thumbnail: '/images/games/crash-goal.jpg',
    provider: 'Spribe',
    isFavorite: false,
  },
  {
    id: 'crash-2',
    name: 'AERO',
    thumbnail: '/images/games/aero.jpg',
    provider: 'Turbo Games',
    isFavorite: true,
  },
  {
    id: 'crash-3',
    name: 'Kite',
    thumbnail: '/images/games/kite.jpg',
    provider: 'SmartSoft',
    isFavorite: false,
  },
  {
    id: 'crash-4',
    name: 'Aviator',
    thumbnail: '/images/games/aviator.jpg',
    provider: 'Spribe',
    isFavorite: false,
  },
  {
    id: 'crash-5',
    name: 'JetX',
    thumbnail: '/images/games/jetx.jpg',
    provider: 'SmartSoft',
    isFavorite: false,
  },
];
