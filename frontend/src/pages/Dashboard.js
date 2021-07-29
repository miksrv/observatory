import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Grid, Dimmer, Loader, Message, Button} from 'semantic-ui-react'

import MainContainer from '../components/MainContainer'

import Sensors from '../layouts/Sensors'
import Relay from '../layouts/Relay'
import Camera from '../layouts/Camera'
import Voltage from '../layouts/Voltage'
import TempGraphic from '../components/TempGraphic'
import VoltageGraphic from '../components/VoltageGraphic'

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'
import * as relayActions from '../store/relay/actions'

import _ from 'lodash'

import sensors from '../data/sensors'
import meteo from '../data/meteo'

class Dashboard extends Component {

    state = {
        // relayList: relay,
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

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const { storeRelayCurrent, storeRelayStatus } = this.props
    //     // const { relayIndex, relayList } = this.state
    //
    //     if (storeRelayCurrent !== prevProps.storeRelayCurrent) {
    //
    //         // relayList[relayIndex].loader = ! relayList[relayIndex].loader
    //         // relayList[relayIndex].value = ! relayList[relayIndex].value
    //         // storeRelayStatus.data.relay[relayIndex][relayIndex] = (storeRelayStatus.data.relay[relayIndex][relayIndex] === 1 ? 0 : 1)
    //
    //         this.setState({
    //             // relayList: relayList,
    //             // relayIndex: false,
    //             relayDisabled: false
    //         })
    //     }
    // }

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
                            <br />
                            <div className='card padding devices-sensor'>
                                <div className='item'>
                                    <div className='name'>Температура на улице \ в обсерватории</div>
                                    <div className='value'>26.6℃ (+2.1) \ 23.1℃ (+3.9)</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>Влажность на улице \ в обсерватории</div>
                                    <div className='value'>15.8% (+2.4) \ 43.2℃ (+0.3)</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>Температура главного зеркала</div>
                                    <div className='value'>15.8% (+2.4)</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>Температура блока питания</div>
                                    <div className='value'>15.8% (+2.4)</div>
                                </div>
                                <div className='item'>
                                    <div className='name'>Температура серверного шкафа</div>
                                    <div className='value'>43.2℃</div>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <Camera />
                        </Grid.Column>
                    </Grid>


                    {/*{! _.isEmpty(relayList) ?*/}
                    {/*    (<Grid columns={(window.innerWidth < 500 ? 1 : relayList.length)}>*/}
                    {/*        {relayList.map((item, key) => {*/}
                    {/*            return (*/}
                    {/*                <Relay*/}
                    {/*                    key={key}*/}
                    {/*                    data={item}*/}
                    {/*                    index={key}*/}
                    {/*                    auth={(!_.isEmpty(authData) && authData.status === true)}*/}
                    {/*                    disabled={relayDisabled}*/}
                    {/*                    state={!_.isEmpty(storeRelayStatus) && typeof storeRelayStatus.data !== 'undefined' ? storeRelayStatus.data.relay[key][key] : false}*/}
                    {/*                    handleSwitch={(k) => this.handleRelaySwitch(k)}*/}
                    {/*                />*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </Grid>)*/}
                    {/*    :*/}
                    {/*    (<Message negative>*/}
                    {/*            <Message.Header>Ошибка получения данных реле</Message.Header>*/}
                    {/*            <p>Возникла проблема получения данных с удаленного сервера. Возможно сервер не отвечает или сеть не доступна.</p>*/}
                    {/*        </Message>*/}
                    {/*    )*/}
                    {/*}*/}
                    {/*<Grid>*/}
                    {/*    {meteo.map((item, key) => {*/}
                    {/*        return (*/}
                    {/*            <Sensors*/}
                    {/*                key={key}*/}
                    {/*                widget={item}*/}
                    {/*                data={! _.isEmpty(storeMeteoSummary) ? storeMeteoSummary.data[item.source] : 0}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*    {sensors.map((item, key) => {*/}
                    {/*        return (*/}
                    {/*            <Sensors*/}
                    {/*                key={key}*/}
                    {/*                widget={item}*/}
                    {/*                data={! _.isEmpty(sensorData) ? sensorData['data'][item.source] : 0}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</Grid>*/}
                    <Grid>
                        <Voltage
                            title='Монтировка HEQ5 Pro'
                            data={typeof sensorData.data !== "undefined" && sensorData.data}
                            index={1}
                        />
                        <Voltage
                            title='Камера ZWO ASI 1600mm'
                            data={typeof sensorData.data !== "undefined" && sensorData.data}
                            index={2}
                        />
                        <Voltage
                            title='Фокусер ZWO EAF'
                            data={typeof sensorData.data !== "undefined" && sensorData.data}
                            index={3}
                        />
                        {! _.isEmpty(sensorData) && (
                            <Grid.Column computer={4} tablet={8} mobile={16}>
                                <div className={'card sensor'}>
                                    <div className='title'>Температуры</div>
                                    <div>Главное зеркало <b>{sensorData.data.t2.value}℃</b></div>
                                    <div>AC/DC Блок питания <b>{sensorData.data.t1.value}℃</b></div>
                                    <div>Серверный шкаф <b>{sensorData.data.t3.value}℃</b></div>
                                </div>
                            </Grid.Column>
                        )}
                    </Grid>
                    <Grid>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                            {! _.isEmpty(sensorStat) ? (
                                <VoltageGraphic
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
                        <Grid.Column computer={8} tablet={16} mobile={16}>
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