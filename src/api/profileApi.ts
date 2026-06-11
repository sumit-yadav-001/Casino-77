import { baseApi } from './baseApi';
import type { UserProfile } from '@/types/user.types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (data) => ({
        url: '/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    changePassword: builder.mutation<{ message: string }, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: '/profile/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    uploadAvatar: builder.mutation<{ url: string }, FormData>({
      query: (data) => ({
        url: '/profile/avatar',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    submitKyc: builder.mutation<{ status: string }, FormData>({
      query: (data) => ({
        url: '/profile/kyc',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getKycStatus: builder.query<{ status: string; documents: Array<{ type: string; status: string }> }, void>({
      query: () => '/profile/kyc/status',
      providesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useSubmitKycMutation,
  useGetKycStatusQuery,
} = profileApi;
