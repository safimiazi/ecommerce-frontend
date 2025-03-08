/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (userInfo : any) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    registraion: builder.mutation({
      query: (userInfo : any) => ({
        url: '/users/registration',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistraionMutation } = authApi;