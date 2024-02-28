import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/employee", credentials: 'include' }),
    tagTypes: ["employee"],
    endpoints: (builder) => {
        return {
            getemployee: builder.query({
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    }
                },
                // transformResponse: data => data.result,
                providesTags: ["employee"]
            }),
            fetchEmp: builder.query({
                query: (id) => {
                    return {
                        url: "/fetchemployees",
                        method: "GET",
                    }
                },
                // transformResponse: data => data.result,
                providesTags: ["employee"]
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/apiEndPoint",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"]
            }),

        }
    }
})

export const { useGetemployeeQuery,useFetchEmpQuery ,useAddUserMutation } = employeeApi
