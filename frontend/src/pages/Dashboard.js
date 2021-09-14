import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'

import MainContainer from '../components/MainContainer'

import Sensors from '../layouts/Sensors'
import Relay from '../layouts/Relay'
import Camera from '../layouts/Camera'
import Chart from '../layouts/Chart'

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'
import * as relayActions from '../store/relay/actions'

import _ from 'lodash'

import voltage from '../charts/voltage'
import temphumd from '../charts/temphumd'

class Dashboard extends Component {

    state = {
        relayIndex: null,
        relayDisabled: false,
        intervalId: null
    }

    componentDidMount() {
        this.updateData()

        const intervalId = setInterval(() => {
            this.updateData()
        }, 30000)

        this.setState({intervalId})
    }

    componentWillUnmount() {
        const { intervalId } = this.state

        clearInterval(intervalId)
    }

    onUpdateData = () => {

    }

    updateData = () => {
        const { dispatch } = this.props

        dispatch(astroActions.getSensorStat('t,h,t1,t2,t3,p1,p2,p3'))
        dispatch(astroActions.getSensorData())
        dispatch(relayActions.getStatus())
        dispatch(meteoActions.getSummary())
    }

    handleSwitch = (index, status) => {
        const { dispatch, token } = this.props

        this.setState({ relayDisabled: true })

        dispatch(relayActions.setStatus(index, ! status, token)).then(() => {
            dispatch(relayActions.getStatus()).then(() => {
                this.setState({ relayDisabled: false })
            })
        })
    }

    render() {
        const { sensorData, storeRelayStatus, storeMeteoSummary, authData, sensorStat } = this.props
        const { relayDisabled } = this.state

        return (
            <MainContainer
                title='Статус'
                updateTime={sensorData.update}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Grid>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <Relay
                                auth={(!_.isEmpty(authData) && authData.status === true)}
                                disabled={relayDisabled}
                                store={!_.isEmpty(storeRelayStatus) && typeof storeRelayStatus.data !== 'undefined' ? storeRelayStatus.data.relay : false}
                                handleSwitch={(index, status) => this.handleSwitch(index, status)}
                            />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <Camera />
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <Sensors
                                astro={! _.isEmpty(sensorData) ? sensorData.data : []}
                                meteo={! _.isEmpty(storeMeteoSummary) ? storeMeteoSummary.data : []}
                            />
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                            <Chart
                                config={voltage}
                                data={{
                                    p1: !_.isEmpty(sensorStat) ? sensorStat.data.p1 : [],
                                    p2: !_.isEmpty(sensorStat) ? sensorStat.data.p2 : [],
                                    p3: !_.isEmpty(sensorStat) ? sensorStat.data.p3 : []
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                            <Chart
                                config={temphumd}
                                data={{
                                    h: !_.isEmpty(sensorStat) ? sensorStat.data.h : [],
                                    t: !_.isEmpty(sensorStat) ? sensorStat.data.t : [],
                                    t1: !_.isEmpty(sensorStat) ? sensorStat.data.t1 : [],
                                    t3: !_.isEmpty(sensorStat) ? sensorStat.data.t3 : [],
                                    t2: !_.isEmpty(sensorStat) ? sensorStat.data.t2 : []
                                }}
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        storeRelayStatus: state.relay.relayStatus,
        storeRelayCurrent: state.relay.relayCurrent,
        storeMeteoSummary: state.meteo.summaryData,

        sensorData: state.astro.sensorData,

        authData: state.auth.authData,
        token: state.auth.token,

        sensorStat: state.astro.sensorStat
    }
}

export default connect(mapStateToProps)(Dashboard)