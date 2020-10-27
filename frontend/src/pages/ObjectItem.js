import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import * as observatoryActions from '../store/observatory/actions'

import getTimeFromSec from '../data/functions'

import moment from 'moment'

import _ from 'lodash'

class ObjectItem extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const { name } = this.props.match.params

        dispatch(observatoryActions.fetchDataByName(name))
    }

    setClassByFilter = filter => {
        switch (filter) {
            case 'Red'       : return 'filter-r'
            case 'Green'     : return 'filter-g'
            case 'Blue'      : return 'filter-b'
            case 'Luminance' : return 'filter-l'
            case 'Ha'        : return 'filter-h'
            case 'SII'       : return 'filter-s'
            case 'OIII'      : return 'filter-o'

            default : return ''
        }
    }

    render() {
        const { name } = this.props.match.params
        const { objectData } = this.props

        return (
            <div>
            { ( ! _.isEmpty(objectData)) ? (
                <Container>
                    <br />
                    <div>Объект: <b>{name}</b></div>
                    <div>Всего кадров: <b>{objectData.frames}</b></div>
                    <div>Общая выдержка: <b>{getTimeFromSec(objectData.exposure)}</b></div>
                    <Link to={'/'}>Вернуться к списку всех объектов</Link>
                    <br />
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Имя файла</Table.HeaderCell>
                                <Table.HeaderCell>Exp</Table.HeaderCell>
                                <Table.HeaderCell>Фильтр</Table.HeaderCell>
                                <Table.HeaderCell>℃</Table.HeaderCell>
                                <Table.HeaderCell>Gain</Table.HeaderCell>
                                <Table.HeaderCell>Offset</Table.HeaderCell>
                                <Table.HeaderCell>Дата и время</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {objectData.data.map((item, key) => (
                                <Table.Row key={key}>
                                    <Table.Cell>{item.item_file_name}</Table.Cell>
                                    <Table.Cell>{item.item_exptime}</Table.Cell>
                                    <Table.Cell className={this.setClassByFilter(item.item_filter)}>{item.item_filter}</Table.Cell>
                                    <Table.Cell>{item.item_ccd_temp}</Table.Cell>
                                    <Table.Cell>{item.item_gain}</Table.Cell>
                                    <Table.Cell>{item.item_offset}</Table.Cell>
                                    <Table.Cell>{moment.utc(item.item_date_obs).utcOffset('GMT+05:00').format("D.MM.Y, H:mm")}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
            ) : (
                <Dimmer active>
                    <Loader>Загрузка</Loader>
                </Dimmer>
            )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        objectData: state.observatory.objectData
    }
}

export default connect(mapStateToProps)(ObjectItem)