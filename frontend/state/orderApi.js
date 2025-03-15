import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:9009/api/pizza/'}),
    endpoints: builder =>({
        getOrder: builder.query({
            query:()=>'history',
            providesTags:['order'],
        }),
        createOrder: builder.mutation ({
            query:body => ({
                url:'order',
                method:'POST',
                body
            }),
            invalidatesTags:['order']
        })
    })
})

export const {
    useGetOrderQuery,useCreateOrderMutation
} = orderApi