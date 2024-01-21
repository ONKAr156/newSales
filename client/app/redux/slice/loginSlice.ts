"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/', credentials: 'include'
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: 'api/admin/login',
        method: 'POST',
        body: credentials
      })
    }),
    
    employeeLogin: builder.mutation({
      query: (credentials) => ({
        url: 'api/employee/login',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const {  useEmployeeLoginMutation,useAdminLoginMutation  } = loginSlice
