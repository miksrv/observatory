import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Table, Grid, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTimeFromSec, setClassByFilter } from '../data/functions'

import * as astroActions from '../store/astro/actions'

import FilterList from '../layouts/FilterList'
import MainContainer from '../components/MainContainer'
import defaultPhoto from '../static/images/default-photo.png'

import SunCalc from 'suncalc'
import moment from 'moment'
import phases from '../data/moon_phase'

import _ from 'lodash'

const PHOTO_URL = 'https://api.miksoft.pro/photo/'

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

    findPhoto = (name, array) => {
        let dataFIT = array.find(function (o) {
            return o.photo_obj === name
        })

        return dataFIT
    }

    render() {
        const { objectData, isAuth, storePhotoList } = this.props
        const { name } = this.props.match.params
        const photo = this.findPhoto(name, storePhotoList)
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
                            <Grid.Column computer={10} tablet={10} mobile={16}>
                                <h1 inverted as='h1'>Данные съемки: {photo !== undefined ? photo.photo_title : name}</h1>
                                <div><span className='second-color'>Дата обработки:</span> {(photo !== undefined ? moment(photo.photo_date).format('DD.MM.YYYY') : '---')}</div>
                                <div><span className='second-color'>Сделано кадров:</span> {(objectExists ? objectData.stats.shot : '---')}</div>
                                <div><span className='second-color'>Общая выдержка:</span> {(objectExists ? getTimeFromSec(objectData.stats.exp, true) : '---')}</div>
                                <div><span className='second-color'>Накоплено данных:</span> {(objectExists ? objectData.filesize + ' Гб' : '---')}</div>
                                <FilterList data={objectExists && objectData.stats} />
                                <Link to='/object/'>Вернуться к списку всех объектов</Link>
                            </Grid.Column>
                            <Grid.Column computer={6} tablet={6} mobile={16}>
                                {(photo !== undefined) ? (
                                    <Link to={'/photo/' + photo.photo_obj}>
                                        <Image src={PHOTO_URL + photo.photo_obj + '_thumb.jpg'} size='medium' className='border' floated='right' />
                                    </Link>
                                ) : (
                                    <Image src={defaultPhoto} size='medium' className='border' floated='right' />
                                )}
                            </Grid.Column>
                        </Grid>
                    </div>
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
                                    {objectData.data.map((item, key) => (
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
                                                {phases[(Math.round(SunCalc.getMoonIllumination(moment.utc(item.item_date_obs).utcOffset('GMT+05:00')).phase * 8) / 8)]} {moment.utc(item.item_date_obs).utcOffset('GMT+05:00').format("D.MM.Y, H:mm")}
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