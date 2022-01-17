import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table, Image } from 'semantic-ui-react'
import { TPhoto, TFiltersTypes } from '../../app/types'
import { getTimeFromSec } from '../../functions/helpers'

type TTableRowProps = {
    photo: TPhoto
}

const FILTERS: TFiltersTypes[] = ['Luminance', 'Red', 'Green', 'Blue', 'Ha', 'OIII', 'SII']

const RenderTableRow: React.FC<TTableRowProps> = (props) => {
    const { photo } = props

    return (
        <Table.Row>
            <Table.Cell width='one'>
                <Link to={`/photo/${photo.object}?date=${photo.date}`} className='item'>
                    <Image
                        className='photo'
                        size='tiny'
                        src={`${process.env.REACT_APP_API_HOST}public/photo/${photo.file}_thumb.${photo.ext}`}
                    />
                </Link>
            </Table.Cell>
            <Table.Cell>{moment(photo.date).format('DD.MM.Y')}</Table.Cell>
            <Table.Cell>{photo.parameters?.frames}</Table.Cell>
            <Table.Cell>{photo.parameters ? getTimeFromSec(photo.parameters?.exposure, true) : '---'}</Table.Cell>
            {FILTERS.map((filter, key) =>
                <Table.Cell className={photo.parameters?.filters[filter] && photo.parameters?.filters[filter].frames > 0 ? `filter-${filter}` : ''} key={key}>
                    {photo.parameters?.filters[filter].exposure && getTimeFromSec((photo.parameters?.filters[filter].exposure))}
                </Table.Cell>
            )}
        </Table.Row>
    )
}

export default RenderTableRow