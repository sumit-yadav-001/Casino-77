import { baseApi } from './baseApi';

interface AppSettings {
  notifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorAuth: boolean;
  language: string;
  timezone: string;
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<AppSettings, void>({
      query: () => '/settings',
      providesTags: ['Settings'],
    }),

    updateSettings: builder.mutation<AppSettings, Partial<AppSettings>>({
      query: (data) => ({
        url: '/settings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
