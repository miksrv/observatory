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

    handleRelaySwitch = (index) => {
        if (typeof (index) === 'undefined') return

        console.log('handleRelaySwitch', index)
        console.log('relayData', this.props.relayData)
        // console.log('relayData', this.props.relayData.data.relay[index])

        delete this.props.relayData.data.relay[index]
    }

    render() {
        const { sensorData, relayData, meteoData, authData, sensorStat } = this.props

        return (
            <MainContainer
                updateTime={sensorData.update}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Relay
                        data={relayData}
                        auth={(!_.isEmpty(authData) && authData.status === true)}
                        handleSwitch={(k) => this.handleRelaySwitch(k)}
                    />
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

        authData: state.observatory.authData,

        sensorStat: state.observatory.sensorStat
    }
}

export default connect(mapStateToProps)(Dashboard)