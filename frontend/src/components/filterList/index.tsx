import React from 'react'
import { declOfNum } from '../../functions/helpers'
import { TObjectFilters } from '../../app/types'
import translate from '../../functions/translate'

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

    return <li>
        <span className={`filter-${name}`}>{name}</span>
        {minutes} {declOfNum(minutes, lang.minutes)} ({frames} {declOfNum(frames, lang.frames)})
    </li>
}

const FilterList: React.FC<TFilterListProps> = (props) => {
    const { filters } = props
    const filterList: TFilterListItem[] = []

    Object.entries(filters).forEach(([key, value]) =>
        value.exposure && filterList.push({name: key, exposure: value.exposure, frames: value.frames}))

    return (
        <ul className='filter-list'>
            {filterList.map((item) =>
                <FilterListItem filter={item} />
            )}
        </ul>
    )
}

export default FilterList