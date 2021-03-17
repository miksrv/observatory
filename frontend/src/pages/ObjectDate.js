import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Table, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import * as astroActions from '../store/astro/actions'

import MainContainer from '../components/MainContainer'

import { getTimeFromSec, setClassByFilter } from '../data/functions'

import moment from 'moment'

import _ from 'lodash'

class ObjectItem extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const { date } = this.props.match.params

        dispatch(astroActions.getObjectStats(date))
    }

    updateData = () => {}

    render() {
        const { storeStatisticDay } = this.props
        const { date } = this.props.match.params

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Header inverted as='h2'>Дата съемки: {moment(date).format('dddd, MMMM DD, YYYY')}</Header>
                    <div>Сделано кадров: <b>{(!_.isEmpty(storeStatisticDay) ? storeStatisticDay.frames : '---')}</b></div>
                    <div>Общая выдержка: <b>{(!_.isEmpty(storeStatisticDay) ? getTimeFromSec(storeStatisticDay.exposure) : '---')}</b> (часов:минут)</div>
                    <div>Накоплено данных: <b>{(!_.isEmpty(storeStatisticDay) ? storeStatisticDay.filesize : '---')}</b> Гб</div>
                    <Link to={'/'}>Вернуться к календарю</Link>
                    <br /><br />
                    <div className='card table-loader'>
                        { ( ! _.isEmpty(storeStatisticDay)) ? (
                            <Table celled inverted selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Объект</Table.HeaderCell>
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
                                    {storeStatisticDay.data.map((obj, key) => (
                                        <Table.Row key={key}>
                                            <Table.Cell><Link to={'/object/' + obj.item_object}>{obj.item_object}</Link></Table.Cell>
                                            <Table.Cell>{obj.item_file_name}</Table.Cell>
                                            <Table.Cell>{obj.item_exptime}</Table.Cell>
                                            <Table.Cell className={setClassByFilter(obj.item_filter)}>{obj.item_filter}</Table.Cell>
                                            <Table.Cell>{obj.item_ccd_temp}</Table.Cell>
                                            <Table.Cell>{obj.item_gain}</Table.Cell>
                                            <Table.Cell>{obj.item_offset}</Table.Cell>
                                            <Table.Cell>{moment.utc(obj.item_date_obs).utcOffset('GMT+05:00').format("D.MM.Y, H:mm")}</Table.Cell>
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
        storeStatisticDay: state.astro.statisticDay,
    }
}

export default connect(mapStateToProps)(ObjectItem)