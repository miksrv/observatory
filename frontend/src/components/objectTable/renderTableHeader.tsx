import React from 'react'
import { Table } from 'semantic-ui-react'
import { TObjectSortable, TSortOrdering } from './types'

type TTableHeaderProps = {
    sort: TObjectSortable
    order: TSortOrdering
    handlerSortClick: (field: TObjectSortable) => void
}

type THeaderFields = {
    key: TObjectSortable
    name: string
}

export const HEADER_FIELDS: THeaderFields[] = [
    { key: 'name', name: 'Объект' },
    { key: 'photo', name: 'Фото' },
    { key: 'frames', name: 'Кадров' },
    { key: 'exposure', name: 'Выдержка' },
    { key: 'Luminance', name: 'Luminance' },
    { key: 'Red', name: 'Red' },
    { key: 'Green', name: 'Green' },
    { key: 'Blue', name: 'Blue' },
    { key: 'Ha', name: 'Ha' },
    { key: 'OIII', name: 'OIII' },
    { key: 'SII', name: 'SII' }
]

const RenderTableHeader: React.FC<TTableHeaderProps> = (props) => {
    const { sort, order, handlerSortClick } = props

    return (
        <Table.Header>
            <Table.Row>
                {HEADER_FIELDS.map((item) =>
                    <Table.HeaderCell
                        key={item.key}
                        sorted={sort === item.key ? order : undefined}
                        onClick={() => handlerSortClick(item.key)}
                    >
                        {item.name}
                    </Table.HeaderCell>
                )}
            </Table.Row>
        </Table.Header>
    )
}

export default RenderTableHeader