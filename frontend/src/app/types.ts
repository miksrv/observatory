export interface IRestResponse {
    status: boolean
    payload?: any
    errorText?: string
}

export interface IRestStatistic extends IRestResponse {
    payload: IStatistic
}

// Спсок всех объектов каталога
export interface IRestCatalogList extends IRestResponse {
    payload: TCatalog[]
}

// Объект каталога
export interface IRestCatalogItem extends IRestResponse {
    payload: TCatalog
}

// Спсок всех фотографий
export interface IRestPhotoList extends IRestResponse {
    payload: TPhoto[]
}

// Список всех объектов
export interface IRestObjectList extends IRestResponse {
    payload: IObjectListItem[]
}

// Список названий всех объектов
export interface IRestObjectNames extends IRestResponse {
    payload: string[]
}

// Один объект
export interface IRestObjectItem extends IRestResponse {
    payload: TObject
}

// Список файлов по объекту
export interface IRestObjectFiles extends IRestResponse {
    payload: TFIle[]
}

export interface IRestNewsList extends IRestResponse {
    payload: {
        count: number
        news: TNews[]
    }
}

export interface IRestWeatherMonth extends IRestResponse {
    payload: {
        date: string
        weather: TWeatherMonth[]
    }
}

export interface IRestAuth {
    status: boolean
    token: string
}

export interface ICredentials {
    username: string
    password: string
}

export interface IStatistic {
    photos: number
    objects: number
    frames: number
    exposure: number
    filesize: number
}

export interface IObjectListItem {
    name: string
    date: string
    frames: number
    exposure: number
    Luminance: number
    Red: number
    Green: number
    Blue: number
    Ha: number
    OIII: number
    SII: number
}

export type TPhoto = {
    object: string
    date: string
    file: string
    ext: string
    parameters?: TObject
}

export type TCatalog = {
    name: string
    title: string
    text: string
    category: string
    ra: number
    dec: number
}

export type TObject = {
    date: string
    exposure: number
    frames: number
    filesizes: number
    filters: TObjectFilters
}

export type TObjectFilters = {
    Luminance: TFilterItem
    Red: TFilterItem
    Green: TFilterItem
    Blue: TFilterItem
    Ha: TFilterItem
    OIII: TFilterItem
    SII: TFilterItem
}

export type TFIle = {
    id: string
    name: string
    date: string
    filter: TFiltersTypes
    exposure: number
    temp: number
    gain: number
    offset: number
    dec: number
    ra: number
}

export type TNews = {
    date: number
    text: string
    link: string
    comments: number
    likes: number
    reposts: number
    views: number
    photos: TNewsPhotos[] | undefined
}

export type TWeatherMonth = {
    date: string
    clouds: number
    temperature: number
    wind_speed: number
}

export type TNewsPhotos = {
    full: TNewsPhotosItem
    thumb: TNewsPhotosItem
}

export type TNewsPhotosItem = {
    height: number
    width: number
    src: string
}

export type TFiltersTypes = 'Luminance' | 'Red' | 'Green' | 'Blue' | 'Ha' | 'OIII' | 'SII'

export type TFilterItem = {
    exposure: number
    frames: number
}