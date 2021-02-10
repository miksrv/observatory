import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react'

import MainContainer from '../components/MainContainer'

import Sensors from '../layouts/Sensors'
import Relay from '../layouts/Relay'
import Camera from '../layouts/Camera'
import TempGraphic from '../components/TempGraphic'

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'
import * as relayActions from '../store/relay/actions'

import _ from 'lodash'

import sensors from '../data/sensors'
import meteo from '../data/meteo'
import relay from '../data/relay'

class Dashboard extends Component {

    state = {
        relayList: relay,
        relayIndex: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        this.updateData()

        dispatch(astroActions.getSensorStat())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { storeRelayCurrent, storeRelayStatus } = this.props
        const { relayIndex, relayList } = this.state

        if (storeRelayCurrent !== prevProps.storeRelayCurrent) {

            relayList[relayIndex].loader = ! relayList[relayIndex].loader
            relayList[relayIndex].value = ! relayList[relayIndex].value
            storeRelayStatus.data.relay[relayIndex][relayIndex] = (storeRelayStatus.data.relay[relayIndex][relayIndex] === 1 ? 0 : 1)

            this.setState({
                relayList: relayList,
                relayIndex: false
            })
        }
    }

    updateData = () => {
        const { dispatch } = this.props

        dispatch(astroActions.getSensorData())
        dispatch(relayActions.getStatus())
        dispatch(meteoActions.getSummary())
    }

    handleRelaySwitch = (index) => {
        const { dispatch, token } = this.props
        const { relay } = this.props.storeRelayStatus.data
        const { relayList } = this.state

        relayList[index].loader = ! relayList[index].loader

        this.setState({
            relayList: relayList,
            relayIndex: index
        })

        dispatch(relayActions.setStatus(index, ! relay[index][index], token))
    }

    render() {
        const { sensorData, storeRelayStatus, storeMeteoSummary, authData, sensorStat } = this.props
        const { relayList } = this.state

        return (
            <MainContainer
                updateTime={sensorData.update}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Grid columns={relayList.length}>
                        {relayList.map((item, key) => {
                            return (
                                <Relay
                                    key={key}
                                    data={item}
                                    index={key}
                                    auth={(!_.isEmpty(authData) && authData.status === true)}
                                    state={! _.isEmpty(storeRelayStatus) ? storeRelayStatus.data.relay[key][key] : false}
                                    handleSwitch={(k) => this.handleRelaySwitch(k)}
                                />
                            )
                        })}
                    </Grid>
                    <Grid>
                        {meteo.map((item, key) => {
                            return (
                                <Sensors
                                    key={key}
                                    widget={item}
                                    data={! _.isEmpty(storeMeteoSummary) ? storeMeteoSummary.data[item.source] : 0}
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
                            {! _.isEmpty(sensorStat) ? (
                                <TempGraphic
                                    sensorStat={sensorStat}
                                />
                            ) : (
                                <div className='card' style={{height: 305}}>
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