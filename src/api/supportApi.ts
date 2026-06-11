import { baseApi } from './baseApi';
import type { SupportTicket, ReferralInfo, LeaderboardEntry } from '@/types/user.types';

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<SupportTicket[], void>({
      query: () => '/support/tickets',
      providesTags: ['Support'],
    }),

    getTicketById: builder.query<SupportTicket, string>({
      query: (id) => `/support/tickets/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Support', id }],
    }),

    createTicket: builder.mutation<SupportTicket, { subject: string; description: string; category: string }>({
      query: (data) => ({
        url: '/support/tickets',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Support'],
    }),

    replyToTicket: builder.mutation<SupportTicket, { ticketId: string; message: string }>({
      query: ({ ticketId, message }) => ({
        url: `/support/tickets/${ticketId}/reply`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['Support'],
    }),

    getReferralInfo: builder.query<ReferralInfo, void>({
      query: () => '/referral',
      providesTags: ['Referral'],
    }),

    getLeaderboard: builder.query<LeaderboardEntry[], { period?: string }>({
      query: (params) => ({
        url: '/referral/leaderboard',
        params,
      }),
      providesTags: ['Referral'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useReplyToTicketMutation,
  useGetReferralInfoQuery,
  useGetLeaderboardQuery,
} = supportApi;
