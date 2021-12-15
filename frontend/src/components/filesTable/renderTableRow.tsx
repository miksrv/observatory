import React from 'react'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import { TFIle } from '../../app/types'

import MoonPhase from '../moonPhase'

type TTableRow = {
    item: TFIle
}

const RenderTableRow: React.FC<TTableRow> = (props) => {
    const { item } = props

    return <Table.Row key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.exposure}</Table.Cell>
        <Table.Cell className={`filter-${item.filter}`}>{item.filter}</Table.Cell>
        <Table.Cell>{item.temp}</Table.Cell>
        <Table.Cell>{item.gain}</Table.Cell>
        <Table.Cell>{item.offset}</Table.Cell>
        <Table.Cell>
            <MoonPhase date={item.date} />
            {moment.utc(item.date).utcOffset('GMT+05:00').format('D.MM.Y, H:mm')}
        </Table.Cell>
    </Table.Row>
}

export default RenderTableRow