import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import FullTable from '../layouts/FullTable'
import Statistic from '../layouts/Statistic'
import EventCalendar from '../layouts/EventCalendar'
import EventModal from '../layouts/EventModal'
// import ExpChart from '../informers/ExpChart'
// import Sun from '../informers/Sun'
// import Moon from '../informers/Moon'

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'

import _ from 'lodash'

// import TempGraphic from "../components/TempGraphic";

class Main extends Component {
    state = {
        showModalEvent: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(astroActions.getFITStat())
        dispatch(astroActions.getEventCalendarFIT())

        dispatch(meteoActions.getMeteoEvents())
    }

    updateData = () => {}

    handleEventPress = selected => {
        this.setState({ showModalEvent: true })

        const { dispatch } = this.props
        let action = (selected.type === 'meteo' ? meteoActions : astroActions)

        dispatch(action.getStatisticDay(moment(selected.start).format('DD.MM.YYYY')))
    }

    handleEventModalClose = () => {
        this.setState({ showModalEvent: false })
    }

    handleNavigatePress = date => {
        const { dispatch } = this.props

        dispatch(astroActions.getEventCalendarFIT(moment(date).format('DD.MM.YYYY')))
        dispatch(meteoActions.getMeteoEvents(moment(date).format('DD.MM.YYYY')))
    }

    render() {
        const { FITStat, FITEvent, meteoEvents } = this.props // graphic
        const { showModalEvent } = this.state

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <EventModal
                    show={showModalEvent}
                    data={[]}
                    fOnClose={() => this.handleEventModalClose()}
                />
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
        FITStat: state.astro.FITStat,
        FITEvent: state.astro.FITEvent,
        meteoEvents: state.meteo.meteoEvents
        // graphic: state.astro.graphic,
    }
}

export default connect(mapStateToProps)(Main)