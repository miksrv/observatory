import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'

import Statistic from '../layouts/Statistic'
import EventCalendar from '../layouts/EventCalendar'
import EventModal from '../layouts/EventModal'
// import ExpChart from '../informers/ExpChart'
// import Sun from '../informers/Sun'
// import Moon from '../informers/Moon'

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'

import moonPhrase from '../data/moon_phrase'

import _ from 'lodash'

// import TempGraphic from "../components/TempGraphic";

class Main extends Component {
    state = {
        showModalEvent: false,
        calendarMoonPhrases: []
    }

    componentDidMount() {
        const { dispatch, storeMeteoArchive, storePhotoArchive } = this.props
        const monthStart = moment().clone().startOf('month').format('DD-MM-YYYY')
        const monthEnd   = moment().clone().endOf('month').format('DD-MM-YYYY')

        _.isEmpty(storeMeteoArchive) && dispatch(meteoActions.getArchive(monthStart, monthEnd))
        _.isEmpty(storePhotoArchive) && dispatch(astroActions.getArchive(monthStart, monthEnd))

        this.setState({calendarMoonPhrases: moonPhrase(monthStart, monthEnd)})
    }

    updateData = () => {}

    handleEventPress = selected => {
        const { dispatch } = this.props

        this.setState({showModalEvent: true})

        if (selected.type === 'astro')
        {
            //console.log('handleEventPress', moment(selected.start).format('YYYY-MM-DD'))
            dispatch(astroActions.getObjectStats(moment(selected.start).format('YYYY-MM-DD')))
        }

        // let action = (selected.type === 'meteo' ? meteoActions : astroActions)
        //
        // dispatch(action.getStatisticDay(moment(selected.start).format('DD.MM.YYYY')))
    }

    handleEventModalClose = () => {
        this.setState({ showModalEvent: false })
    }

    handleNavigatePress = date => {
        const { dispatch } = this.props

        const monthStart = moment(date).clone().startOf('month').format('DD-MM-YYYY')
        const monthEnd   = moment(date).clone().endOf('month').format('DD-MM-YYYY')

        dispatch(astroActions.getArchive(monthStart, monthEnd))
        dispatch(meteoActions.getArchive(monthStart, monthEnd))

        this.setState({calendarMoonPhrases: moonPhrase(monthStart, monthEnd)})
    }

    render() {
        const { storePhotoStatistic, storePhotoArchive, storeMeteoArchive, storeStatisticDay } = this.props // graphic
        const { showModalEvent, calendarMoonPhrases } = this.state

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <EventModal
                    show={showModalEvent}
                    data={storeStatisticDay}
                    fOnClose={() => this.handleEventModalClose()}
                />
                <Container>
                    <Statistic
                        data={storePhotoStatistic}
                    />
                    <EventCalendar
                        moon={calendarMoonPhrases}
                        meteo={storeMeteoArchive}
                        astro={storePhotoArchive}
                        fNavigate={this.handleNavigatePress}
                        fGetEvent={this.handleEventPress}
                    />
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
        storePhotoStatistic: state.astro.FITStat,
        storeStatisticDay: state.astro.statisticDay,
        storePhotoArchive: state.astro.FITEvent,
        storeMeteoArchive: state.meteo.archiveData
        // graphic: state.astro.graphic,
    }
}

export default connect(mapStateToProps)(Main)