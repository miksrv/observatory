import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Dimmer, Grid, Loader, Table } from 'semantic-ui-react'
import { Link} from 'react-router-dom'
import { getTimeFromSec, setClassByFilter } from '../data/functions'

import * as astroActions from '../store/astro/actions'

import MainContainer from '../components/MainContainer'
import FilterList from '../layouts/FilterList'
import PhotoArchive from '../layouts/PhotoArchive'
import ObjectMap from '../layouts/ObjectMap'

import SunCalc from 'suncalc'
import moment from 'moment'
import phases from '../data/moon_phase'

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { objectData } = this.props

        if ( ! _.isEmpty(objectData) && objectData.status === false) this.props.history.push('/404')
    }

    onClickDelete = itemID => {
        const { dispatch, token } = this.props

        dispatch(astroActions.deleteObjectDataByID(itemID, token))
    }

    updateData = () => {}

    findPhoto = (name, array) => array.find((o) => o.object === name)

    render() {
        const { objectData, isAuth, storePhotoList } = this.props
        const { name } = this.props.match.params
        const photo = !_.isEmpty(storePhotoList) ? this.findPhoto(name, storePhotoList.photos) : {}
        const objectExists = !_.isEmpty(objectData) && objectData.status === true

        return (
            <MainContainer
                title={'Данные съемки ' + name}
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card container'>
                        <Grid>
                            <Grid.Column computer={7} tablet={7} mobile={16}>
                                <h1 inverted as='h1'>Объект: {photo !== undefined ? photo.title : name}</h1>
                                <div><span className='second-color'>Дата обработки:</span> {(photo !== undefined ? moment(photo.date).format('DD.MM.YYYY') : '---')}</div>
                                <div><span className='second-color'>Категория:</span> {(photo !== undefined ? photo.category : '---')}</div>
                                <div><span className='second-color'>Сделано кадров:</span> {(objectExists ? objectData.stats.shot : '---')}</div>
                                <div><span className='second-color'>Общая выдержка:</span> {(objectExists ? getTimeFromSec(objectData.stats.exp, true) : '---')}</div>
                                <div><span className='second-color'>Накоплено данных:</span> {(objectExists ? _.round(objectData.stats.size / 1024, 1) + ' Гб' : '---')}</div>
                                <br />
                                <Link to='/object/'>Вернуться к списку всех объектов</Link>
                            </Grid.Column>
                            <Grid.Column computer={4} tablet={4} mobile={16}>
                                <FilterList data={objectExists && objectData.stats} />
                            </Grid.Column>
                            <Grid.Column computer={5} tablet={5} mobile={16}>
                                <ObjectMap data={objectExists && objectData.object} name={name} />
                            </Grid.Column>
                        </Grid>
                    </div>
                    {!_.isEmpty(objectData.photos) && (
                        <PhotoArchive
                            photos={objectData.photos}
                            clickHandler={(file, date) => this.props.history.push(`/photo/${name}?date=${date}`)}
                        />
                    )}
                    <br />
                    <div className='card table-loader'>
                        {objectExists ? (
                            <Table celled inverted selectable>
                                <Table.Header>
                                    <Table.Row>
                                        {isAuth && <Table.HeaderCell />}
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
                                    {objectData.files.map((item, key) => (
                                        <Table.Row key={key}>
                                            {isAuth &&
                                                <Table.Cell collapsing>
                                                    <Button
                                                        className='table-button'
                                                        color='red'
                                                        icon='delete'
                                                        size='mini'
                                                        onClick={() => this.onClickDelete(item.file_id)}
                                                    />
                                                </Table.Cell>
                                            }
                                            <Table.Cell>{item.item_file_name}</Table.Cell>
                                            <Table.Cell>{item.item_exptime}</Table.Cell>
                                            <Table.Cell className={setClassByFilter(item.item_filter)}>{item.item_filter}</Table.Cell>
                                            <Table.Cell>{item.item_ccd_temp}</Table.Cell>
                                            <Table.Cell>{item.item_gain}</Table.Cell>
                                            <Table.Cell>{item.item_offset}</Table.Cell>
                                            <Table.Cell>
                                                <span className={'moon ' + phases[(Math.round(SunCalc.getMoonIllumination(moment.utc(item.item_date_obs).utcOffset('GMT+05:00')).phase * 8) / 8)]}>
                                                    {moment.utc(item.item_date_obs).utcOffset('GMT+05:00').format("D.MM.Y, H:mm")}
                                                </span>
                                            </Table.Cell>
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
        objectData: state.astro.objectData,
        storePhotoList: state.photo.dataList,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(ObjectItem)