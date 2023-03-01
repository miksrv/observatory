import { TFiltersTypes } from '../../app/types'

export type TObjectSortable =
    | 'name'
    | 'photo'
    | 'frames'
    | 'exposure'
    | TFiltersTypes

export type TSortOrdering = 'ascending' | 'descending'
