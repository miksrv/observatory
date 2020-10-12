import React from 'react'
import { Table, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import 'moment/locale/ru'

import { getTimeFromSec, functTwo } from '../data/functions'

import _ from 'lodash'

const exampleReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending',
            }
        default:
            throw new Error()
    }
}

const Dashboard = (props) => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        column: 'name',
        data: _.sortBy(props.data.statistic, ['name']),
        direction: 'descending',
    })

    const { column, data, direction } = state

    return (
        <Container>
            <Table sortable celled inverted selectable compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                        >Объект</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'frame' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'frame' })}
                        >Кадров
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'total' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'total' })}
                        >Выдержка</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'l' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'l' })}
                        >L</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'r' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'r' })}
                        >R</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'g' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'g' })}
                        >G</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'b' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'b' })}
                        >B</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'h' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'h' })}
                        >H</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'o' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'o' })}
                        >O</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 's' ? direction : null}
                            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 's' })}
                        >S</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((item, key) => (
                        <Table.Row key={key}>
                            <Table.Cell><Link to={'/object/' + item.name}>{item.name}</Link></Table.Cell>
                            <Table.Cell>{item.frame}</Table.Cell>
                            <Table.Cell>{getTimeFromSec(item.total)}</Table.Cell>
                            <Table.Cell className={item.l > 0 && 'filter-l'}>{getTimeFromSec(item.l)}</Table.Cell>
                            <Table.Cell className={item.r > 0 && 'filter-r'}>{getTimeFromSec(item.r)}</Table.Cell>
                            <Table.Cell className={item.g > 0 && 'filter-g'}>{getTimeFromSec(item.g)}</Table.Cell>
                            <Table.Cell className={item.b > 0 && 'filter-b'}>{getTimeFromSec(item.b)}</Table.Cell>
                            <Table.Cell className={item.h > 0 && 'filter-h'}>{getTimeFromSec(item.h)}</Table.Cell>
                            <Table.Cell className={item.o > 0 && 'filter-o'}>{getTimeFromSec(item.o)}</Table.Cell>
                            <Table.Cell className={item.s > 0 && 'filter-s'}>{getTimeFromSec(item.s)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default Dashboard