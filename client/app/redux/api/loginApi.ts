"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/', credentials: 'include'
  }),
  endpoints: (builder) => ({

    adminLogin: builder.mutation({
      query: (userData) => ({
        url: 'api/admin/login',
        method: 'POST',
        body: userData
      })
    }),

    employeeLogin: builder.mutation({
      query: (userData) => ({
        url: 'api/employee/login',
        method: 'POST',
        body: userData
      })
    })
  })
});

export const { useEmployeeLoginMutation, useAdminLoginMutation } = loginApi
