import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid, Icon } from 'semantic-ui-react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { WiSunset } from 'react-icons/wi'

import { WiMoonAltFirstQuarter, WiMoonrise, WiMoonset
} from 'react-icons/wi'

import Header from '../components/Header'
import Dashboard from '../layouts/Dashboard'
import Charts from '../layouts/Charts'

import * as observatoryActions from '../store/observatory/actions'
import getTimeFromSec from '../data/functions'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import moment from 'moment'
import 'moment/locale/ru'

import _ from 'lodash'

class Main extends Component {

    state = {
        isOpen: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getAstroData())
        dispatch(observatoryActions.fetchData())
        dispatch(observatoryActions.fetchGraphData())
    }

    clickHandler = () => {
        this.setState({isOpen: true})
    }

    render() {
        const { isOpen } = this.state
        const { statistic, graphic, astroData } = this.props

        const localizer = momentLocalizer(moment)

        let camera = 'https://fits.miksoft.pro/get/webcam_photo'

        console.log('astroData', astroData)


        return (
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={camera}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                <Header/>
                { ( ! _.isEmpty(statistic) && ! _.isEmpty(graphic) && ! _.isEmpty(astroData))  ? (
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
                                <Grid.Column computer={6} tablet={8} mobile={16}>
                                    <div className='informer sun'>
                                        <Grid>
                                            <Grid.Column width={5} className='icon-container'>
                                                <WiSunset className='icon' />
                                            </Grid.Column>
                                            <Grid.Column width={11}>
                                                <div className='title'>Продолжительность дня</div>
                                                <div className='description'>Рассвет: <span className='value'>{moment.unix(astroData.sun.rise).format("H:mm")}</span></div>
                                                <div className='description'>Закат: <span className='value'>{moment.unix(astroData.sun.set).format("H:mm")}</span></div>
                                            </Grid.Column>
                                        </Grid>
                                    </div>
                                </Grid.Column>

                                <Grid.Column computer={10} tablet={8} mobile={16}>
                                    <div className='informer moon'>
                                        <Grid columns={3}>
                                            <Grid.Row stretched>
                                                <Grid.Column textAlign='left' width={7}>
                                                    <div>
                                                        Возраст (дней): <b>{Number((astroData.moon.age).toFixed(2))}</b>
                                                    </div>
                                                    <div>
                                                        Освещенность: <b>{Number((astroData.moon.illumination).toFixed(2)) * 100}%</b>
                                                    </div>
                                                    <div>
                                                        Расстояние (км): <b>{Number((astroData.moon.distance).toFixed(0))}</b>
                                                    </div>
                                                    <div>
                                                        Фаза Луны: <b>{astroData.moon.phase_name}</b>
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width={2} className='icon-holder'>
                                                    <WiMoonAltFirstQuarter className='icon' />
                                                </Grid.Column>
                                                <Grid.Column textAlign='right' width={7}>
                                                    <div className='icon-info-container'>
                                                        <WiMoonrise className='icon-info' /> Восход Луны: <b>{moment.unix(astroData.moon.rise).format("H:mm")}</b>
                                                    </div>
                                                    <div className='icon-info-container'>
                                                        <WiMoonset className='icon-info' /> Закат Луны: <b>{moment.unix(astroData.moon.set).format("H:mm")}</b>
                                                    </div>
                                                    <div>
                                                        Новолуние: <b>{moment.unix(astroData.moon.phase_new).format("DD.MM.Y")}</b>
                                                    </div>
                                                    <div>
                                                        Полнолуние: <b>{moment.unix(astroData.moon.phase_full).format("DD.MM.Y")}</b>
                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Grid.Column>
                            </Grid>

                            {/*<Grid>*/}
                            {/*    <Grid.Column computer={16} tablet={16} mobile={16}>*/}
                            {/*        <div className='informer container'>*/}
                            {/*            <Calendar*/}
                            {/*                localizer={localizer}*/}
                            {/*                events={[]}*/}
                            {/*                startAccessor="start"*/}
                            {/*                endAccessor="end"*/}
                            {/*                style={{ height: 500 }}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </Grid.Column>*/}
                            {/*</Grid>*/}
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
        astroData: state.observatory.astroData,
        statistic: state.observatory.statistic,
        graphic: state.observatory.graphic
    }
}

export default connect(mapStateToProps)(Main)