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

// Один объект
export interface IRestObjectItem extends IRestResponse {
    payload: TObject
}

// Список файлов по объекту
export interface IRestObjectFiles extends IRestResponse {
    payload: TFIle[]
}

export interface IStatistic {
    photos: number
    objects: number
    shots: number
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

export type TFiltersTypes = 'Luminance' | 'Red' | 'Green' | 'Blue' | 'Ha' | 'OIII' | 'SII'

export type TFilterItem = {
    exposure: number
    frames: number
}