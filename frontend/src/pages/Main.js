import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import FullTable from '../layouts/FullTable'
import Statistic from '../informers/Statistic'
import EventCalendar from '../informers/EventCalendar'
// import ExpChart from '../informers/ExpChart'
// import Sun from '../informers/Sun'
// import Moon from '../informers/Moon'

import * as observatoryActions from '../store/observatory/actions'
import * as meteoActions from '../store/meteo/actions'

import _ from 'lodash'

// import TempGraphic from "../components/TempGraphic";

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getFITStat())
        dispatch(observatoryActions.getEventCalendarFIT())

        dispatch(meteoActions.getMeteoEvents())
    }

    updateData = () => {}

    handleEventPress = (selectSlot) => {
        console.log('handleEventPress', selectSlot)
    }

    handleNavigatePress = (date) => {
        const { dispatch } = this.props

        dispatch(observatoryActions.getEventCalendarFIT(moment(date).format('DD.MM.YYYY')))
        dispatch(meteoActions.getMeteoEvents(moment(date).format('DD.MM.YYYY')))
    }

    render() {
        const { FITStat, FITEvent, meteoEvents } = this.props // graphic

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Statistic
                        data={FITStat}
                    />
                    <EventCalendar
                        meteo={meteoEvents}
                        astro={FITEvent}
                        fNavigate={this.handleNavigatePress}
                        fGetEvent={this.handleEventPress}
                    />
                    { ! _.isEmpty(FITStat) && (
                        <FullTable
                            data={FITStat}
                        />
                    )}
                </Container>
                        {/*<Grid>*/}
                        {/*    <ExpChart data={graphic} />*/}
                        {/*    <Sun data={astroData.sun} />*/}
                        {/*    <Moon data={astroData.moon} />*/}
                        {/*</Grid>*/}
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        FITStat: state.observatory.FITStat,
        FITEvent: state.observatory.FITEvent,
        meteoEvents: state.meteo.meteoEvents
        // graphic: state.observatory.graphic,
    }
}

export default connect(mapStateToProps)(Main)