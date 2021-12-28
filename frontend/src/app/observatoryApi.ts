import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

import {
    IRestStatistic, IRestPhotoList, IRestObjectList,
    IRestCatalogItem, IRestObjectFiles, IRestObjectItem,
    IRestCatalogList, IRestObjectNames, IRestNewsList,
    IRestAuth, ICredentials
} from './types'

type TQueryNewsList = {
    limit?: number
    offset?: number
}



export const observatoryApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('AuthToken', token)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Получить общую статистику по обсерватории (кадры, выдержка, объекты, использовано места)
        getStatistic: builder.query<IRestStatistic, void>({
            query: () => 'get/statistic/summary',
            keepUnusedDataFor: 3600,
        }),

        // Список объектов каталога
        getCatalogList: builder.query<IRestCatalogList, void>({
            query: () => 'get/catalog/list'
        }),

        // Список объектов каталога
        getCatalogItem: builder.query<IRestCatalogItem, string>({
            query: (name) => `get/catalog/item?object=${name}`
        }),

        // Список фотографий без характеристик
        getPhotoList: builder.query<IRestPhotoList, void>({
            query: () => 'get/photo/list',
            keepUnusedDataFor: 3600,
        }),

        // Список фотографий объекта с характеристиками
        getPhotoListItem: builder.query<IRestPhotoList, string>({
            query: (name) => `get/photo/list?object=${name}`
        }),

        // Получить список объектов
        getObjectList: builder.query<IRestObjectList, void>({
            query: () => 'get/object/list',
            keepUnusedDataFor: 3600,
        }),

        // Получить список названий объектов
        getObjectNames: builder.query<IRestObjectNames, void>({
            query: () => 'get/object/names'
        }),

        // Получить объект по имени
        getObjectItem: builder.query<IRestObjectItem, string>({
            query: (name) => `get/object/item?object=${name}`
        }),

        // Список файлов объекта по его имени
        getObjectFiles: builder.query<IRestObjectFiles, string>({
            query: (name) => `get/file/list?object=${name}`,
            keepUnusedDataFor: 3600,
        }),

        // Список файлов объекта по его имени
        getNewsList: builder.query<IRestNewsList, TQueryNewsList>({
            query: (props) => {
                const limit = props.limit ? `?limit=${props.limit}` : ''
                const offset = props.offset ? `&offset=${props.offset}` : ''

                return `news/list${limit}${offset}`
            }
        }),

        // Получить погоду за месяц (архив + прогноз)
        getWeatherMonth: builder.query<any, void>({
            query: () => 'weather/month',
            keepUnusedDataFor: 3600,
        }),

        // Авторизация
        login: builder.mutation<IRestAuth, ICredentials>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Проверка токена авторизации
        loginCheck: builder.mutation<IRestAuth, void>({
            query: () => 'auth/check'
        }),
    })
})

// Export hooks for usage in functional components
export const {
    useGetStatisticQuery, useGetCatalogListQuery, useGetPhotoListQuery,
    useGetObjectListQuery, useGetObjectItemQuery, useGetObjectFilesQuery,
    useGetCatalogItemQuery, useGetPhotoListItemQuery, useGetObjectNamesQuery,
    useGetNewsListQuery, useGetWeatherMonthQuery,
    useLoginMutation, useLoginCheckMutation
} = observatoryApi
