import React from 'react'

import { filterLabel } from '../data/functions'

import _ from 'lodash'

const FilterList = props => {
    const { data } = props

    return (
        !_.isEmpty(data) && (
            <ul>
                {filterLabel(data.Luminance, 'Luminance')}
                {filterLabel(data.Red, 'Red')}
                {filterLabel(data.Green, 'Green')}
                {filterLabel(data.Blue, 'Blue')}
                {filterLabel(data.OIII, 'OIII')}
                {filterLabel(data.SII, 'SII')}
                {filterLabel(data.Ha, 'Ha')}
            </ul>
        )
    )
}

export default FilterList