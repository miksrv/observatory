import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

import {
    IRestStatistic, IRestFilesMonth,
    IRestCatalogList, IRestCatalogItem,
    IRestPhotoList,
    IRestObjectList, IRestObjectNames, IRestObjectItem,
    IRestObjectFiles,
    IRestNewsList,
    IRestWeatherMonth, IRestWeatherCurrent,
    IRestAuth, ICredentials,
    IRelayList, IRelaySet,
    IRestSensorStatistic
} from './types'

type TQueryNewsList = {
    limit?: number
    offset?: number
}

export const observatoryApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Relay'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('AuthToken', token)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        // STATISTIC
        // Получить общую статистику по обсерватории (кадры, выдержка, объекты, использовано места)
        getStatistic: builder.query<IRestStatistic, void>({
            query: () => 'get/statistic/summary',
            keepUnusedDataFor: 3600
        }),

        // Коллекция дней за месяц, в которые работала обсерватория (exp, frames, objects)
        getFilesMonth: builder.mutation<IRestFilesMonth, string>({
            query: (date) => `get/statistic/month?date=${date}`
        }),


        // CATALOG
        // Список объектов каталога
        getCatalogList: builder.query<IRestCatalogList, void>({
            query: () => 'get/catalog/list'
        }),

        // Список объектов каталога
        getCatalogItem: builder.query<IRestCatalogItem, string>({
            query: (name) => `get/catalog/item?object=${name}`
        }),


        // PHOTO
        // Список фотографий без характеристик
        getPhotoList: builder.query<IRestPhotoList, void>({
            query: () => 'get/photo/list',
            keepUnusedDataFor: 3600
        }),

        // Список фотографий объекта с характеристиками
        getPhotoListItem: builder.query<IRestPhotoList, string>({
            query: (name) => `get/photo/list?object=${name}`
        }),


        // OBJECTS
        // Получить список объектов
        getObjectList: builder.query<IRestObjectList, void>({
            query: () => 'get/object/list',
            keepUnusedDataFor: 3600
        }),

        // Получить список названий объектов
        getObjectNames: builder.query<IRestObjectNames, void>({
            query: () => 'get/object/names'
        }),

        // Получить объект по имени
        getObjectItem: builder.query<IRestObjectItem, string>({
            query: (name) => `get/object/item?object=${name}`
        }),


        // FILES
        // Список файлов объекта по его имени
        getObjectFiles: builder.query<IRestObjectFiles, string>({
            query: (name) => `get/file/list?object=${name}`,
            keepUnusedDataFor: 3600
        }),


        // NEWS
        // Список новостей
        getNewsList: builder.query<IRestNewsList, TQueryNewsList>({
            query: (props) => {
                const limit = props.limit ? `?limit=${props.limit}` : ''
                const offset = props.offset ? `&offset=${props.offset}` : ''

                return `news/list${limit}${offset}`
            }
        }),


        // WEATHER
        // Получить погоду за месяц (архив + прогноз)
        getWeatherMonth: builder.mutation<IRestWeatherMonth, string>({
            query: (date) => `weather/month?date=${date}`
        }),

        // Текущая погода
        getWeatherCurrent: builder.query<IRestWeatherCurrent, null>({
            query: (name) => `weather/current`
        }),


        // AUTH
        login: builder.mutation<IRestAuth, ICredentials>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials
            }),
        }),

        logout: builder.mutation<IRestAuth, void>({
            query: () => 'auth/logout'
        }),

        // Проверка токена авторизации
        loginCheck: builder.mutation<IRestAuth, void>({
            query: () => 'auth/check'
        }),


        // RELAY
        // Список реле
        getRelayList: builder.query<IRelayList, void>({
            query: (name) => `relay/list`,
            keepUnusedDataFor: 3600
        }),

        getRelayState: builder.query<any, null>({
            query: () => `relay/state`,
            providesTags: () => [{ type: 'Relay', id: 'LIST' }]
        }),

        setRelayStatus: builder.mutation<IRelayList, IRelaySet>({
            query: (data) => ({
                url: 'relay/set',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Relay', id: 'LIST' }],
        }),


        // SENSOR
        getSensorStatistic: builder.query<IRestSensorStatistic, void>({
            query: () => 'get/sensors/statistic'
        }),
    })
})

// Export hooks for usage in functional components
export const {
    useGetStatisticQuery, useGetFilesMonthMutation,
    useGetCatalogListQuery, useGetCatalogItemQuery,
    useGetPhotoListQuery, useGetPhotoListItemQuery,
    useGetObjectListQuery, useGetObjectNamesQuery, useGetObjectItemQuery,
    useGetObjectFilesQuery,
    useGetNewsListQuery,
    useGetWeatherMonthMutation, useGetWeatherCurrentQuery,
    useLoginMutation, useLogoutMutation, useLoginCheckMutation,
    useGetRelayListQuery, useGetRelayStateQuery, useSetRelayStatusMutation,
    useGetSensorStatisticQuery
} = observatoryApi
