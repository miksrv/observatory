import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react'

import MainContainer from '../components/MainContainer'

import Sensors from '../informers/Sensors'
import Relay from '../informers/Relay'
import Camera from '../informers/Camera'
import TempGraphic from '../components/TempGraphic'

import * as observatoryActions from '../store/observatory/actions'
import * as meteoActions from '../store/meteo/actions'

import _ from 'lodash'

import sensors from '../data/sensors'
import meteo from '../data/meteo'

class Dashboard extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        this.updateData()

        dispatch(observatoryActions.getSensorStat())
    }

    updateData = () => {
        const { dispatch } = this.props

        dispatch(observatoryActions.getSensorData())
        dispatch(observatoryActions.getRelayData())
        dispatch(meteoActions.getMeteoData())
    }

    render() {
        const { sensorData, relayData, meteoData, meteoStat, sensorStat } = this.props

        return (
            <MainContainer
                updateTime={sensorData.update}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Relay data={relayData} />
                    <Grid>
                        {meteo.map((item, key) => {
                            return (
                                <Sensors
                                    key={key}
                                    widget={item}
                                    data={! _.isEmpty(meteoData) ? meteoData[item.type][item.source] : 0}
                                />
                            )
                        })}
                        {sensors.map((item, key) => {
                            return (
                                <Sensors
                                    key={key}
                                    widget={item}
                                    data={! _.isEmpty(sensorData) ? sensorData['data'][item.source] : 0}
                                />
                            )
                        })}
                    </Grid>
                    <Grid>
                        <Grid.Column computer={6} tablet={16} mobile={16}>
                            <Camera />
                        </Grid.Column>
                        <Grid.Column computer={10} tablet={16} mobile={16}>
                            {(! _.isEmpty(sensorStat)) && (
                                <TempGraphic
                                    sensorStat={sensorStat}
                                />
                            ) || (
                                <div className='informer' style={{height: 305}}>
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        sensorData: state.observatory.sensorData,
        relayData: state.observatory.relayData,
        meteoData: state.meteo.meteoData,

        sensorStat: state.observatory.sensorStat
    }
}

export default connect(mapStateToProps)(Dashboard)