import React from 'react'

import { filterLabel } from '../data/functions'

import _ from 'lodash'

const FilterList = props => {
    const { filters } = props.data

    return (
        !_.isEmpty(filters) && (
            <ul>
                {filterLabel(filters.Luminance.exp, filters.Luminance.shot, 'Luminance')}
                {filterLabel(filters.Red.exp, filters.Red.shot, 'Red')}
                {filterLabel(filters.Green.exp, filters.Green.shot, 'Green')}
                {filterLabel(filters.Blue.exp, filters.Blue.shot, 'Blue')}
                {filterLabel(filters.OIII.exp, filters.OIII.shot, 'OIII')}
                {filterLabel(filters.SII.exp, filters.SII.shot, 'SII')}
                {filterLabel(filters.Ha.exp, filters.Ha.shot, 'Ha')}
            </ul>
        )
    )
}

export default FilterList