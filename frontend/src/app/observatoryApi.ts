import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRestStatistic } from './types'

export const observatoryApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        { baseUrl: process.env.REACT_APP_API_HOST }),
    endpoints: (builder) => ({
        // Получить общую статистику по обсерватории (кадры, выдержка, объекты, использовано места)
        getStatistic: builder.query<IRestStatistic, void>({
            query: () => 'statistic'
        }),
    }),
})

// Export hooks for usage in functional components
export const { useGetStatisticQuery } = observatoryApi
