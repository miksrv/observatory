import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'

import Sensors from '../informers/Sensors'
import Relay from '../informers/Relay'
import Camera from '../informers/Camera'

import * as observatoryActions from '../store/observatory/actions'
import * as meteoActions from '../store/meteo/actions'

import _ from 'lodash'

import sensors from '../data/sensors'
import meteo from '../data/meteo'

class Dashboard extends Component {

    componentDidMount() {
        this.updateData()
    }

    updateData = () => {
        const { dispatch } = this.props

        dispatch(observatoryActions.getSensorData())
        dispatch(observatoryActions.getRelayData())
        dispatch(meteoActions.getMeteoData())
    }

    render() {
        const { sensorData, relayData, meteoData } = this.props

        return (
            <MainContainer
                updateTime={sensorData.update}
                onUpdateData={this.updateData}
            >
                { ( ! _.isEmpty(sensorData) && ! _.isEmpty(meteoData))  ? (
                    <Container>
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
                        <Camera />
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
        sensorData: state.observatory.sensorData,
        relayData: state.observatory.relayData,
        meteoData: state.meteo.generalData
    }
}

export default connect(mapStateToProps)(Dashboard)