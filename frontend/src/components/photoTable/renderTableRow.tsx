import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table, Image } from 'semantic-ui-react'
import { TPhoto, TFiltersTypes } from '../../app/types'
import { getTimeFromSec } from '../../functions/helpers'

type TTableRowProps = {
    photo: TPhoto
    key: number
}

const FILTERS: TFiltersTypes[] = ['Luminance', 'Red', 'Green', 'Blue', 'Ha', 'OIII', 'SII']

const RenderTableRow: React.FC<TTableRowProps> = (props) => {
    const { photo, key } = props

    return (
        <Table.Row key={key}>
            <Table.Cell width='one'>
                <Link to={`/photo/${photo.object}?date=${photo.date}`} key={key} className='item'>
                    <Image
                        className='photo'
                        size='tiny'
                        src={`https://api.miksoft.pro/public/photo/${photo.file}_thumb.${photo.ext}`}
                    />
                </Link>
            </Table.Cell>
            <Table.Cell>{moment(photo.date).format('DD.MM.Y')}</Table.Cell>
            <Table.Cell>{photo.parameters?.frames}</Table.Cell>
            <Table.Cell>{photo.parameters ? getTimeFromSec(photo.parameters?.exposure, true) : '---'}</Table.Cell>
            {FILTERS.map((filter) =>
                <Table.Cell className={photo.parameters?.filters[filter] && photo.parameters?.filters[filter].frames > 0 ? `filter-${filter}` : ''}>{photo.parameters?.filters[filter].exposure && getTimeFromSec((photo.parameters?.filters[filter].exposure))}</Table.Cell>
            )}
        </Table.Row>
    )
}

export default RenderTableRow