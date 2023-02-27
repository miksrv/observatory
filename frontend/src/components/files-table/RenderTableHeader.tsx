import React from 'react'
import { Table } from 'semantic-ui-react'
import { TObjectSortable, TSortOrdering } from './types'

type TTableHeader = {
    sort: TObjectSortable
    order: TSortOrdering
    handlerSortClick?: (field: TObjectSortable) => void
}

type THeaderFields = {
    key: TObjectSortable
    name: string
}

const HEADER_FIELDS: THeaderFields[] = [
    { key: 'name', name: 'Имя файла' },
    { key: 'exposure', name: 'Выдержка' },
    { key: 'filter', name: 'Фильтр' },
    { key: 'temp', name: '℃' },
    { key: 'gain', name: 'Gain' },
    { key: 'offset', name: 'Offset' },
    { key: 'stars', name: 'Звезд' },
    { key: 'sky', name: 'SNR' },
    { key: 'hfr', name: 'HFR' },
    { key: 'date', name: 'Дата съемки' }
]

const RenderTableHeader: React.FC<TTableHeader> = (props) => {
    const { sort, order, handlerSortClick } = props

    return <Table.Header>
        <Table.Row>
            {HEADER_FIELDS.map((item, key) =>
                <Table.HeaderCell
                    key={key}
                    sorted={sort === item.key ? order : undefined}
                    onClick={() => handlerSortClick?.(item.key)}
                >
                    {item.name}
                </Table.HeaderCell>
            )}
        </Table.Row>
    </Table.Header>
}

export default RenderTableHeader
