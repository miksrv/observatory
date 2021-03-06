import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Image, Grid, Dimmer, Loader, Button } from 'semantic-ui-react'
import Lightbox from 'react-image-lightbox'

import moment from 'moment'
import defaultPhoto from '../static/images/default-photo.png'

import { getTimeFromSec } from '../data/functions'

import MainContainer from '../components/MainContainer'
import PhotoGrid from '../layouts/PhotoGrid'
import FilterList from '../layouts/FilterList'

import * as photoActions from '../store/photo/actions'

import _ from 'lodash'

const PHOTO_URL = 'https://api.miksoft.pro/photo/'

class PhotoItem extends Component {
    state = {
        photoIndex: 0,
        isOpen: false
    }

    componentDidMount() {
        const { name } = this.props.match.params

        this.loadItem(name)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { name } = this.props.match.params
        const { storePhotoItem } = this.props

        if (name !== prevProps.match.params.name)
            this.loadItem(name)

        if ( ! _.isEmpty(storePhotoItem) && storePhotoItem.status === false) this.props.history.push('/404')
    }

    componentWillUnmount() {
        const { dispatch } = this.props

        dispatch(photoActions.clearItem())
    }

    loadItem = name => {
        const { dispatch } = this.props

        dispatch(photoActions.getItem(name))
    }

    updateData = () => {}

    clickHandler = photo => {
        this.setState({isOpen: true, photoIndex: photo})
    }

    render() {
        const { photoIndex, isOpen } = this.state
        const { storePhotoList, storePhotoItem } = this.props
        const objectExists = !_.isEmpty(storePhotoItem) && storePhotoItem.status === true

        return (
            <MainContainer
                title={!_.isEmpty(storePhotoItem) ? storePhotoItem.photo_title : 'Фотография'}
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card photo-info'>
                        <Grid>
                            <Grid.Column computer={9} tablet={8} mobile={16}>
                                <Image
                                    className='border'
                                    src={(objectExists ? PHOTO_URL + storePhotoItem.photo_obj + '_thumb.jpg' : defaultPhoto)}
                                    onClick={() => this.clickHandler(PHOTO_URL + storePhotoItem.photo_obj + '.jpg')}
                                />
                                {(_.isEmpty(storePhotoItem) && (
                                    <Dimmer active>
                                        <Loader>Загрузка</Loader>
                                    </Dimmer>
                                ))}
                            </Grid.Column>
                            <Grid.Column computer={7} tablet={8} mobile={16} className='description'>
                                <div>
                                    <h1>{(!_.isEmpty(storePhotoItem) ? storePhotoItem.photo_title : '')}</h1>
                                    <div><span className='second-color'>Дата обработки:</span> {(objectExists ? moment(storePhotoItem.photo_date).format('DD.MM.YYYY') : '---')}</div>
                                    <div><span className='second-color'>Общая выдержка:</span> {(objectExists && storePhotoItem.stats.exp !== 0 ? getTimeFromSec(storePhotoItem.stats.exp, true) : '---')}</div>
                                    <div><span className='second-color'>Количество кадров:</span> {(objectExists && storePhotoItem.stats.shot !== 0 ? <Link to={'/object/' + storePhotoItem.photo_obj}>{storePhotoItem.stats.shot}</Link> : '---')}</div>
                                    <FilterList data={objectExists && storePhotoItem.stats} />
                                    <p>{(objectExists ? storePhotoItem.photo_text : '')}</p>
                                </div>
                                <div>
                                    <Link to='/photo/'><Button size='mini' icon='grid layout' color='blue' content='Фотографии' /></Link> <Button size='mini' icon='download' color='green' content='Скачать' href={`https://api.miksoft.pro/photo/get/download?name=${storePhotoItem.photo_obj}`} />
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div>
                    <PhotoGrid
                        // photos={shuffle(storePhotoList).slice(0, 4)}
                        photos={storePhotoList.slice(0, 4)}
                        props={this.props}
                    />
                    {isOpen && (
                        <Lightbox
                            mainSrc={photoIndex}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        storePhotoStatistic: state.astro.FITStat,
        storePhotoList: state.photo.dataList,
        storePhotoItem: state.photo.dataItem
    }
}

export default connect(mapStateToProps)(PhotoItem)