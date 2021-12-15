import React from 'react'
import { Table } from 'semantic-ui-react'
import { TPhoto } from '../../app/types'

import RenderTableRow from './renderTableRow'

type TPhotoTableProps = {
    photos: TPhoto[]
}

type THeaderFields = {
    key: string
    name: string
}

const HEADER_FIELDS: THeaderFields[] = [
    { key: 'photo', name: 'Фото' },
    { key: 'date', name: 'Дата' },
    { key: 'frames', name: 'Кадров' },
    { key: 'exposure', name: 'Выдержка' },
    { key: 'Luminance', name: 'L' },
    { key: 'Red', name: 'R' },
    { key: 'Green', name: 'G' },
    { key: 'Blue', name: 'B' },
    { key: 'Ha', name: 'H' },
    { key: 'OIII', name: 'O' },
    { key: 'SII', name: 'S' }
]

const PhotoTable: React.FC<TPhotoTableProps> = (props) => {
    const { photos } = props

    return (
        <Table sortable celled inverted selectable compact className='photo-table'>
            <Table.Header>
                <Table.Row>
                    {HEADER_FIELDS.map((item, key) =>
                        <Table.HeaderCell key={item.key}>
                            {item.name}
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {photos?.map((photo, key) => <RenderTableRow photo={photo} key={key} />)}
            </Table.Body>
        </Table>
    )
}

export default PhotoTable