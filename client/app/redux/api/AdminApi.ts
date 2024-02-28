import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/admin", credentials: 'include' }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getAdmin: builder.query({
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    }
                },
                // transformResponse: data => data.result,
                providesTags: ["admin"]
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/apiEndPoint",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const { useGetAdminQuery, useAddUserMutation } = adminApi
