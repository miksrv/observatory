import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Dimmer, Loader, Icon, Image, Button } from 'semantic-ui-react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'

import moment from 'moment'

import MainContainer from '../components/MainContainer'

import * as newsActions from '../store/news/actions'

import _ from 'lodash'

import avatar from '../static/images/avatar.jpg'

const POST_ON_PAGE = 4

class News extends Component {
    state = {
        activePage: 1,
        postsData: [],
        postsCount: 0,
        btnLoading: false,
        photoIndex: 0,
        isOpen: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(newsActions.getNews(0, POST_ON_PAGE))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { postsData } = this.state
        const { storeNews } = this.props

        if (_.isEmpty(postsData) || storeNews.items !== prevProps.storeNews.items) {
            this.setState({
                postsData: postsData.concat(storeNews.items),
                postsCount: storeNews.count,
                btnLoading: false
            })
        }
    }

    handlePaginationChange = () => {
        const { dispatch } = this.props
        const { activePage } = this.state
        const pageCurrent = activePage + 1

        this.setState({
            activePage: pageCurrent,
            btnLoading: true
        })

        dispatch(newsActions.getNews((pageCurrent * POST_ON_PAGE) - POST_ON_PAGE, POST_ON_PAGE))
    }

    makeImages = data => {
        if (_.isEmpty(data)) {
            return ''
        }

        const photos  = []

        data.filter(function(item) {
            return item.type === "photo"
        }).map(item => {
            let { sizes } = item.photo

            let max = Math.max.apply(Math, sizes.map(function(o) { return o.height }))
            let photo = sizes.find(function(o) { return o.height === max })

            return photos.push({
                src: photo.url,
                width: photo.width,
                height: photo.height
            })
        })

        if ( ! _.isEmpty(photos)) {
            return <Gallery
                    photos={photos}
                    onClick={this.clickHandler}
                />
        }
    }

    clickHandler = (event, { photo, index }) => {
        this.setState({isOpen: true, photoIndex: photo.src})
    }

    updateData = () => {}

    render() {
        const { activePage, postsData, postsCount, btnLoading, isOpen, photoIndex } = this.state

        const pageCount = ! _.isEmpty(postsData) ? Math.ceil(postsCount / POST_ON_PAGE) : 0

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    { ! _.isEmpty(postsData) ? (
                        <>
                            {postsData.map((item, key) => (
                                <Segment key={key} inverted>
                                    <div className='vk-profile'>
                                        <Image src={avatar} avatar />
                                        <div>
                                            <a href={'//vk.com/wall' + item.owner_id + '_' + item.id} title='Обсерватория' rel='noopener noreferrer' target='_blank'>Обсерватория</a>
                                            <div className='vk-info'><Icon name='like' /> {item.likes.count} &middot; {moment.unix(item.date).format("DD MMMM Y в H:mm")}</div>
                                        </div>
                                    </div>
                                    <p className="vk-text">{item.text}</p>
                                    {this.makeImages(item.attachments)}
                                    <div className="clear"></div>
                                </Segment>
                            ))}
                            <Button
                                fluid
                                color='green'
                                onClick={this.handlePaginationChange}
                                disabled={(activePage >= pageCount || btnLoading)}
                                loading={btnLoading}
                            >
                                Загрузить еще
                            </Button>
                        </>
                    ) : (
                        <Dimmer active>
                            <Loader>Загрузка</Loader>
                        </Dimmer>
                    )}
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
        storeNews: state.news.dataJSON
    }
}

export default connect(mapStateToProps)(News)