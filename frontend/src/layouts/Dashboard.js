import React from 'react'
import { Table, Dimmer, Loader, Container, Image, Popup } from 'semantic-ui-react'

import 'moment/locale/ru'
import moment from "moment";

import _ from 'lodash'

import getTimeFromSec from '../data/functions'

const Dashboard = (props) => {
    return (
        <Container>
            <Table celled inverted selectable className='weather-table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Объект</Table.HeaderCell>
                        <Table.HeaderCell>Выдержка</Table.HeaderCell>
                        <Table.HeaderCell>L</Table.HeaderCell>
                        <Table.HeaderCell>R</Table.HeaderCell>
                        <Table.HeaderCell>G</Table.HeaderCell>
                        <Table.HeaderCell>B</Table.HeaderCell>
                        <Table.HeaderCell>H</Table.HeaderCell>
                        <Table.HeaderCell>O</Table.HeaderCell>
                        <Table.HeaderCell>S</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.data.statistic.map((item, key) => (
                        <Table.Row key={key}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{getTimeFromSec(item.total)}</Table.Cell>
                            <Table.Cell>{item.l}</Table.Cell>
                            <Table.Cell>{item.r}</Table.Cell>
                            <Table.Cell>{item.g}</Table.Cell>
                            <Table.Cell>{item.b}</Table.Cell>
                            <Table.Cell>{item.h}</Table.Cell>
                            <Table.Cell>{item.o}</Table.Cell>
                            <Table.Cell>{item.s}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default Dashboard