import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IRestStatistic, IRestPhotoList, IRestObjectList,
    IRestCatalogItem, IRestObjectFiles, IRestObjectItem,
    IRestCatalogList, IRestObjectNames
} from './types'

export const observatoryApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        { baseUrl: process.env.REACT_APP_API_HOST }),
    endpoints: (builder) => ({
        // Получить общую статистику по обсерватории (кадры, выдержка, объекты, использовано места)
        getStatistic: builder.query<IRestStatistic, void>({
            query: () => 'statistic',
            keepUnusedDataFor: 3600,
        }),

        // Список объектов каталога
        getCatalogList: builder.query<IRestCatalogList, void>({
            query: () => 'catalog/list'
        }),

        // Список объектов каталога
        getCatalogItem: builder.query<IRestCatalogItem, string>({
            query: (name) => `catalog/item?object=${name}`
        }),

        // Список фотографий без характеристик
        getPhotoList: builder.query<IRestPhotoList, void>({
            query: () => 'photo/list',
            keepUnusedDataFor: 3600,
        }),

        // Список фотографий объекта с характеристиками
        getPhotoListItem: builder.query<IRestPhotoList, string>({
            query: (name) => `photo/list?object=${name}`
        }),

        // Получить список объектов
        getObjectList: builder.query<IRestObjectList, void>({
            query: () => 'object/list',
            keepUnusedDataFor: 3600,
        }),

        // Получить список названий объектов
        getObjectNames: builder.query<IRestObjectNames, void>({
            query: () => 'object/names'
        }),

        // Получить объект по имени
        getObjectItem: builder.query<IRestObjectItem, string>({
            query: (name) => `object/item?object=${name}`
        }),

        // Список файло объекта по его имени
        getObjectFiles: builder.query<IRestObjectFiles, string>({
            query: (name) => `file/list?object=${name}`,
            keepUnusedDataFor: 3600,
        }),

    }),
})

// Export hooks for usage in functional components
export const {
    useGetStatisticQuery, useGetCatalogListQuery, useGetPhotoListQuery,
    useGetObjectListQuery, useGetObjectItemQuery, useGetObjectFilesQuery,
    useGetCatalogItemQuery, useGetPhotoListItemQuery, useGetObjectNamesQuery
} = observatoryApi
