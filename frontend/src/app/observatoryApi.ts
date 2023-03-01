import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from './store'
import {
    ICredentials,
    IRelayList,
    IRelaySet,
    IRestAuth,
    IRestCatalogItem,
    IRestCatalogList,
    IRestFilesMonth,
    IRestNewsList,
    IRestObjectFiles,
    IRestObjectItem,
    IRestObjectList,
    IRestObjectNames,
    IRestPhotoList,
    IRestSensorStatistic,
    IRestStatistic,
    IRestWeatherCurrent,
    IRestWeatherMonth
} from './types'

type TQueryNewsList = {
    limit?: number
    offset?: number
}

export const observatoryApi = createApi({
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
        // Список объектов каталога
        getCatalogItem: builder.query<IRestCatalogItem, string>({
            query: (name) => `get/catalog/item?object=${name}`
        }),

        // CATALOG
        // Список объектов каталога
        getCatalogList: builder.query<IRestCatalogList, void>({
            query: () => 'get/catalog/list'
        }),

        // Коллекция дней за месяц, в которые работала обсерватория (exp, frames, objects)
        getFilesMonth: builder.mutation<IRestFilesMonth, string>({
            query: (date) => `get/statistic/month?date=${date}`
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

        // FILES
        // Список файлов объекта по его имени
        getObjectFiles: builder.query<IRestObjectFiles, string>({
            keepUnusedDataFor: 3600,
            query: (name) => `get/file/list?object=${name}`
        }),

        // Получить объект по имени
        getObjectItem: builder.query<IRestObjectItem, string>({
            query: (name) => `get/object/item?object=${name}`
        }),

        // OBJECTS
        // Получить список объектов
        getObjectList: builder.query<IRestObjectList, void>({
            keepUnusedDataFor: 3600,
            query: () => 'get/object/list'
        }),

        // Получить список названий объектов
        getObjectNames: builder.query<IRestObjectNames, void>({
            query: () => 'get/object/names'
        }),

        // PHOTO
        // Список фотографий без характеристик
        getPhotoList: builder.query<IRestPhotoList, void>({
            keepUnusedDataFor: 3600,
            query: () => 'get/photo/list'
        }),

        // Список фотографий объекта с характеристиками
        getPhotoListItem: builder.query<IRestPhotoList, string>({
            query: (name) => `get/photo/list?object=${name}`
        }),

        // RELAY
        // Список реле
        getRelayList: builder.query<IRelayList, void>({
            keepUnusedDataFor: 3600,
            query: () => 'relay/list'
        }),
        getRelayState: builder.query<any, null>({
            providesTags: () => [{ id: 'LIST', type: 'Relay' }],
            query: () => 'relay/state'
        }),

        // SENSOR
        getSensorStatistic: builder.query<IRestSensorStatistic, void>({
            query: () => 'get/sensors/statistic'
        }),
        // STATISTIC
        // Получить общую статистику по обсерватории (кадры, выдержка, объекты, использовано места)
        getStatistic: builder.query<IRestStatistic, void>({
            keepUnusedDataFor: 3600,
            query: () => 'get/statistic/summary'
        }),

        // Текущая погода

        getWeatherCurrent: builder.query<IRestWeatherCurrent, null>({
            query: () => 'weather/current'
        }),

        // WEATHER
        // Получить погоду за месяц (архив + прогноз)
        getWeatherMonth: builder.mutation<IRestWeatherMonth, string>({
            query: (date) => `weather/month?date=${date}`
        }),

        // AUTH
        login: builder.mutation<IRestAuth, ICredentials>({
            query: (credentials) => ({
                body: credentials,
                method: 'POST',
                url: 'auth/login'
            })
        }),

        // Проверка токена авторизации

        loginCheck: builder.mutation<IRestAuth, void>({
            query: () => 'auth/check'
        }),

        logout: builder.mutation<IRestAuth, void>({
            query: () => 'auth/logout'
        }),
        setRelayStatus: builder.mutation<IRelayList, IRelaySet>({
            invalidatesTags: [{ id: 'LIST', type: 'Relay' }],
            query: (data) => ({
                body: data,
                method: 'POST',
                url: 'relay/set'
            })
        })
    }),
    reducerPath: 'api',
    tagTypes: ['Relay']
})

// Export hooks for usage in functional components
export const {
    useGetStatisticQuery,
    useGetFilesMonthMutation,
    useGetCatalogListQuery,
    useGetCatalogItemQuery,
    useGetPhotoListQuery,
    useGetPhotoListItemQuery,
    useGetObjectListQuery,
    useGetObjectNamesQuery,
    useGetObjectItemQuery,
    useGetObjectFilesQuery,
    useGetNewsListQuery,
    useGetWeatherMonthMutation,
    useGetWeatherCurrentQuery,
    useLoginMutation,
    useLogoutMutation,
    useLoginCheckMutation,
    useGetRelayListQuery,
    useGetRelayStateQuery,
    useSetRelayStatusMutation,
    useGetSensorStatisticQuery
} = observatoryApi
