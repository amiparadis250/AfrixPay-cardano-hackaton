import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Wallet', 'Transaction'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getWalletBalance: builder.query({
      query: () => '/wallet/balance',
      providesTags: ['Wallet'],
    }),
    sendMoney: builder.mutation({
      query: (transactionData) => ({
        url: '/transactions/send',
        method: 'POST',
        body: transactionData,
      }),
      invalidatesTags: ['Wallet', 'Transaction'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetWalletBalanceQuery,
  useSendMoneyMutation,
} = apiSlice