import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Table } from 'semantic-ui-react'

import { TFiltersTypes, TPhoto } from 'app/types'

import { getTimeFromSec } from 'functions/helpers'

type TTableRowProps = {
    photo: TPhoto
}

const FILTERS: TFiltersTypes[] = [
    'Luminance',
    'Red',
    'Green',
    'Blue',
    'Ha',
    'OIII',
    'SII'
]

const RenderTableRow: React.FC<TTableRowProps> = (props) => {
    const { photo } = props

    return (
        <Table.Row>
            <Table.Cell width='one'>
                <Link
                    to={`/photo/${photo.object}?date=${photo.date}`}
                    className='item'
                >
                    <Image
                        className='photo'
                        size='tiny'
                        src={`${process.env.REACT_APP_API_HOST}public/photo/${photo.file}_thumb.${photo.ext}`}
                    />
                </Link>
            </Table.Cell>
            <Table.Cell content={moment(photo.date).format('DD.MM.Y')} />
            <Table.Cell content={photo.parameters?.frames} />
            <Table.Cell
                content={
                    photo.parameters
                        ? getTimeFromSec(photo.parameters?.exposure, true)
                        : '---'
                }
            />
            {FILTERS.map((filter) => (
                <Table.Cell
                    className={
                        photo.parameters?.filters[filter] &&
                        photo.parameters?.filters[filter].frames > 0
                            ? `filter-${filter}`
                            : ''
                    }
                    key={filter}
                >
                    {photo.parameters?.filters[filter].exposure &&
                        getTimeFromSec(
                            photo.parameters?.filters[filter].exposure
                        )}
                </Table.Cell>
            ))}
        </Table.Row>
    )
}

export default RenderTableRow
