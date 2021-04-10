import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react'
import { getTimeFromSec, setClassByFilter } from '../data/functions'

import * as astroActions from '../store/astro/actions'

import MainContainer from '../components/MainContainer'
import FilterList from '../layouts/FilterList'

import moment from 'moment'

import _ from 'lodash'

class ObjectItem extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        const { date } = this.props.match.params

        dispatch(astroActions.getObjectStats(date))
    }

    updateData = () => {}

    getObjectList = data => {
        let objectsList = []

        if (_.isEmpty(data)) return objectsList

        data.map(obj => {
            return !objectsList.includes(obj.item_object) ? objectsList.push(obj.item_object) : null
        })

        return objectsList
    }

    render() {
        const { storeStatisticDay } = this.props
        const { date } = this.props.match.params

        return (
            <MainContainer
                title={'Данные за ' + moment(date).format('DD.MM.YYYY')}
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card container'>
                        <h1 inverted as='h1'>Дата съемки: {moment(date).format('dddd, DD.MM.YYYY')}</h1>
                        <div><span className='second-color'>Сделано кадров:</span> {(!_.isEmpty(storeStatisticDay) ? storeStatisticDay.frames : '---')}</div>
                        <div><span className='second-color'>Общая выдержка:</span> {(!_.isEmpty(storeStatisticDay) ? getTimeFromSec(storeStatisticDay.exposure, true) : '---')}</div>
                        <div><span className='second-color'>Накоплено данных:</span> {(!_.isEmpty(storeStatisticDay) ? storeStatisticDay.filesize + ' Гб' : '---')}</div>
                        <div><span className='second-color'>Объекты съемки:</span>
                            {!_.isEmpty(storeStatisticDay) && this.getObjectList(storeStatisticDay.data).map((obj, key) => (
                                <Link key={key} to={'/object/' + obj} className='inline-link'>{obj}</Link>
                            ))}
                        </div>
                        <FilterList data={!_.isEmpty(storeStatisticDay) && storeStatisticDay.stats} />
                        <Link to='/'>Вернуться к календарю</Link>
                    </div>
                    <br />
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