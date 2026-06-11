import { baseApi } from './baseApi';
import type { Game, GamesFilter, GamesResponse, GameProvider } from '@/types/game.types';

export const gameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<GamesResponse, GamesFilter>({
      query: (params) => ({
        url: '/games',
        params,
      }),
      providesTags: ['Games'],
    }),

    getGameById: builder.query<Game, string>({
      query: (id) => `/games/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Games', id }],
    }),

    getProviders: builder.query<GameProvider[], void>({
      query: () => '/games/providers',
      providesTags: ['Games'],
    }),

    getGamesByProvider: builder.query<GamesResponse, { providerId: string; page?: number; limit?: number }>({
      query: ({ providerId, ...params }) => ({
        url: `/games/provider/${providerId}`,
        params,
      }),
      providesTags: ['Games'],
    }),

    getGamesByCategory: builder.query<GamesResponse, { category: string; page?: number; limit?: number }>({
      query: ({ category, ...params }) => ({
        url: `/games/category/${category}`,
        params,
      }),
      providesTags: ['Games'],
    }),

    getFavoriteGames: builder.query<GamesResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/games/favorites',
        params,
      }),
      providesTags: ['Games'],
    }),

    toggleFavorite: builder.mutation<{ isFavorite: boolean }, string>({
      query: (gameId) => ({
        url: `/games/${gameId}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Games'],
    }),

    searchGames: builder.query<GamesResponse, { query: string; limit?: number }>({
      query: (params) => ({
        url: '/games/search',
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGamesQuery,
  useGetGameByIdQuery,
  useGetProvidersQuery,
  useGetGamesByProviderQuery,
  useGetGamesByCategoryQuery,
  useGetFavoriteGamesQuery,
  useToggleFavoriteMutation,
  useSearchGamesQuery,
} = gameApi;
