import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid, Statistic, Icon } from 'semantic-ui-react'

import Header from '../components/Header'
import Dashboard from '../layouts/Dashboard'
import Charts from '../layouts/Charts'

import * as observatoryActions from '../store/observatory/actions'
import getTimeFromSec from '../data/functions'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

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

        let camera = 'https://fits.miksoft.pro/get/webcam_photo'

        const stat = [
            { key: 'frames', label: 'Кадров', value: statistic.frames },
            { key: 'exposure', label: 'Выдержка (ч:м)', value: getTimeFromSec(statistic.exposure) },
            { key: 'objects', label: 'Объектов', value: statistic.objects },
            { key: 'size', label: 'Данных (Гб)', value: ((statistic.frames * 32.2) / 1024).toFixed(1) }
        ]

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

                                <Grid.Column computer={4} tablet={8} mobile={16}>
                                    <div className='informer'>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={5} className='icon-container'>
                                                    <Icon name='photo' />
                                                </Grid.Column>
                                                <Grid.Column width={11}>
                                                    <div className='value'>{statistic.frames}</div>
                                                    <div className='info'>Кадров</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>

                                <Grid.Column computer={4} tablet={8} mobile={16}>
                                    <div className='informer'>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={5} className='icon-container'>
                                                    <Icon name='clock outline' />
                                                </Grid.Column>
                                                <Grid.Column width={11}>
                                                    <div className='value'>{getTimeFromSec(statistic.exposure)}</div>
                                                    <div className='info'>Выдержка (ч:м)</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>

                                <Grid.Column computer={4} tablet={8} mobile={16}>
                                    <div className='informer'>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={5} className='icon-container'>
                                                    <Icon name='star outline' />
                                                </Grid.Column>
                                                <Grid.Column width={11}>
                                                    <div className='value'>{statistic.objects}</div>
                                                    <div className='info'>Объектов</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>

                                <Grid.Column computer={4} tablet={8} mobile={16}>
                                    <div className='informer'>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={5} className='icon-container'>
                                                    <Icon name='disk' />
                                                </Grid.Column>
                                                <Grid.Column width={11}>
                                                    <div className='value'>{((statistic.frames * 32.2) / 1024).toFixed(1)}</div>
                                                    <div className='info'>Данных (Гб)</div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                            </Grid>

                            <Grid>
                                <Grid.Column computer={6} tablet={16} mobile={16}>
                                    <div className='informer container'>
                                        <img onClick={() => this.clickHandler()} src={camera} alt='' />
                                    </div>
                                </Grid.Column>
                                <Grid.Column computer={10} tablet={16} mobile={16}>
                                    <div className='informer container'>
                                        <Charts
                                            data={graphic}
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </Container>
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