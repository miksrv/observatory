import React, { useState, useEffect, useCallback } from 'react'
import { declOfNum } from '../../functions/helpers'
import { TObjectFilters } from '../../app/types'
import translate from '../../functions/translate'

import './styles.sass'

type TFilterListProps = {
    filters: TObjectFilters
}

type TFilterListItem = {
    name: string
    exposure: number
    frames: number
}

const FilterListItem: (props: { filter: TFilterListItem }) => JSX.Element = (props) => {
    const { name, exposure, frames } = props.filter
    const minutes = Math.round(exposure / 60)
    const lang = translate().general.declining

    return (
        <li>
            <span className={`filter-${name}`}>{name}</span>
            {minutes} {declOfNum(minutes, lang.minutes)} ({frames} {declOfNum(frames, lang.frames)})
        </li>
    )
}

const FilterList: React.FC<TFilterListProps> = (props) => {
    const { filters } = props
    const [ filtersList, setFiltersList ] = useState<TFilterListItem[]>([])

    const doListFilter = useCallback(() => {
        const tempFiltersList: TFilterListItem[] = []

        Object.entries(filters).forEach(([key, value]) =>
            value.exposure && tempFiltersList.push({name: key, exposure: value.exposure, frames: value.frames}))

        setFiltersList(tempFiltersList)
    }, [filters])

    useEffect(() => {
        doListFilter()
    }, [filters, doListFilter])

    return (
        <ul className='filter-list'>
            {filtersList.map((item) =>
                <FilterListItem filter={item} key={item.name} />
            )}
        </ul>
    )
}

export default FilterList