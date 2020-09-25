import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Dimmer, Loader, Grid} from 'semantic-ui-react'

import Header from '../components/Header'
import Dashboard from '../layouts/Dashboard'
import Charts from '../layouts/Charts'

import * as observatoryActions from '../store/observatory/actions'
import getTimeFromSec from '../data/functions'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import 'moment/locale/ru'
import moment from "moment";

import _ from 'lodash'

class Main extends Component {

    state = {
        isOpen: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.fetchData())
        dispatch(observatoryActions.fetchGraphData())
    }

    clickHandler = () => {
        this.setState({isOpen: true})
    }

    render() {
        const { isOpen } = this.state
        const { statistic, graphic } = this.props

        let camera = 'http://astro.myftp.org:8002/jpg/1/image.jpg'

        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={camera}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                <Header/>
                { ( ! _.isEmpty(statistic) && ! _.isEmpty(graphic))  ? (
                    <div>
                        <br />
                        <Container>
                            <Grid>
                                <Grid.Column width={4} className='cameraPhoto'>
                                    <img onClick={() => this.clickHandler()} src={camera} />
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <h2>Астрономическая обсерватория</h2>
                                    <div>Всего кадров: <b>{statistic.frames}</b></div>
                                    <div>Всего объектов: <b>{statistic.objects}</b></div>
                                    <div>Общая выдержка: <b>{getTimeFromSec(statistic.exposure)}</b></div>
                                </Grid.Column>
                            </Grid>
                        </Container>
                        <br />
                        <Charts
                            data={graphic}
                        />
                        <br />
                        <Dashboard
                            data={statistic}
                        />
                    </div>
                ) : (
                    <Dimmer active>
                        <Loader>Загрузка</Loader>
                    </Dimmer>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statistic: state.observatory.statistic,
        graphic: state.observatory.graphic
    }
}

export default connect(mapStateToProps)(Main)