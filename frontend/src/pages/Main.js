import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid } from 'semantic-ui-react'

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

import MainContainer from '../components/MainContainer'

import Dashboard from '../layouts/Dashboard'

import Statistic from '../informers/Statistic'
import Sensors from '../informers/Sensors'
import Relay from '../informers/Relay'
import Camera from '../informers/Camera'
import ExpChart from '../informers/ExpChart'
import Sun from '../informers/Sun'
import Moon from '../informers/Moon'

import * as observatoryActions from '../store/observatory/actions'
import * as meteoActions from '../store/meteo/actions'

import _ from 'lodash'

import sensors from '../data/sensors'
import meteo from '../data/meteo'

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getAstroData())
        dispatch(observatoryActions.fetchData())
        dispatch(observatoryActions.fetchGraphData())
        dispatch(observatoryActions.getSensorData())
        dispatch(observatoryActions.getRelayData())
        dispatch(meteoActions.getMeteoData())
    }

    render() {
        const { statistic, graphic, astroData, sensorData, relayData, meteoData } = this.props

        // const localizer = momentLocalizer(moment)

        return (
            <MainContainer>
                { ( ! _.isEmpty(statistic) && ! _.isEmpty(graphic) && ! _.isEmpty(astroData) && ! _.isEmpty(sensorData) && ! _.isEmpty(meteoData))  ? (
                    <Container>
                        <Grid>
                            <Statistic data={statistic} />
                        </Grid>
                        <Grid>
                            {meteo.map((item, key) => {
                                return (
                                    <Sensors
                                        key={key}
                                        widget={item}
                                        data={meteoData[item.type][item.source]}
                                    />
                                )
                            })}
                            {sensors.map((item, key) => {
                                return (
                                    <Sensors
                                        key={key}
                                        widget={item}
                                        data={sensorData[item.type][item.source]}
                                    />
                                )
                            })}
                        </Grid>
                        <Relay data={relayData} />
                        <Grid>
                            <Camera />
                            <ExpChart data={graphic} />
                            <Sun data={astroData.sun} />
                            <Moon data={astroData.moon} />
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
                        <br />
                        <Dashboard
                            data={statistic}
                        />
                    </Container>
                ) : (
                    <Dimmer active>
                        <Loader>Загрузка</Loader>
                    </Dimmer>
                )}
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        astroData: state.observatory.astroData,
        sensorData: state.observatory.sensorData,
        relayData: state.observatory.relayData,
        statistic: state.observatory.statistic,
        graphic: state.observatory.graphic,
        meteoData: state.meteo.generalData
    }
}

export default connect(mapStateToProps)(Main)