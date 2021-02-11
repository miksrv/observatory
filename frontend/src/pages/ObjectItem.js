import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Table, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import * as astroActions from '../store/astro/actions'

import MainContainer from '../components/MainContainer'

import { getTimeFromSec } from '../data/functions'

import moment from 'moment'

import _ from 'lodash'

class ObjectItem extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const { name } = this.props.match.params

        dispatch(astroActions.fetchDataByName(name))
    }

    componentWillUnmount() {
        const { dispatch } = this.props

        dispatch(astroActions.clearDataByName())
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

    updateData = () => {}

    render() {
        const { name } = this.props.match.params
        const { objectData } = this.props

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Header inverted as='h2'>Объект: {name}</Header>
                    <div>Всего кадров: <b>{(!_.isEmpty(objectData) ? objectData.frames : '---')}</b></div>
                    <div>Общая выдержка: <b>{(!_.isEmpty(objectData) ? getTimeFromSec(objectData.exposure) : '---')}</b></div>
                    <Link to={'/object/'}>Вернуться к списку всех объектов</Link>
                    <br /><br />
                    <div className='card table-loader'>
                        { ( ! _.isEmpty(objectData)) ? (
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
                        ) : (
                            <Dimmer active>
                                <Loader>Загрузка</Loader>
                            </Dimmer>
                        )}
                    </div>
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        objectData: state.astro.objectData
    }
}

export default connect(mapStateToProps)(ObjectItem)