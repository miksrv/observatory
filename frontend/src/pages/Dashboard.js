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
import relay from '../data/relay'

class Dashboard extends Component {

    state = {
        relayList: relay,
        relayIndex: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        this.updateData()

        dispatch(observatoryActions.getSensorStat())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { relayCurrent, relayData } = this.props
        const { relayIndex, relayList } = this.state

        if (relayCurrent !== prevProps.relayCurrent) {

            relayList[relayIndex].loader = ! relayList[relayIndex].loader
            relayList[relayIndex].value = ! relayList[relayIndex].value
            relayData.data.relay[relayIndex][relayIndex] = (relayData.data.relay[relayIndex][relayIndex] === 1 ? 0 : 1)

            this.setState({
                relayList: relayList,
                relayIndex: false
            })
        }
    }

    updateData = () => {
        const { dispatch } = this.props

        dispatch(observatoryActions.getSensorData())
        dispatch(observatoryActions.getRelayData())
        dispatch(meteoActions.getMeteoData())
    }

    handleRelaySwitch = (index) => {
        const { dispatch, token } = this.props
        const { relay } = this.props.relayData.data
        const { relayList } = this.state

        relayList[index].loader = ! relayList[index].loader

        this.setState({
            relayList: relayList,
            relayIndex: index
        })

        dispatch(observatoryActions.setRelayData(index, ! relay[index][index], token))
    }

    render() {
        const { sensorData, relayData, meteoData, authData, sensorStat } = this.props
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
                                    state={! _.isEmpty(relayData) ? relayData.data.relay[key][key] : false}
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
                            {! _.isEmpty(sensorStat) ? (
                                <TempGraphic
                                    sensorStat={sensorStat}
                                />
                            ) : (
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
        relayCurrent: state.observatory.relayCurrent,
        meteoData: state.meteo.meteoData,

        authData: state.auth.authData,
        token: state.auth.token,

        sensorStat: state.observatory.sensorStat
    }
}

export default connect(mapStateToProps)(Dashboard)