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

import _ from 'lodash'

// import TempGraphic from "../components/TempGraphic";

class Main extends Component {
    state = {
        showModalEvent: false
    }

    componentDidMount() {
        const { dispatch, storeMeteoArchive, storePhotoArchive, storePhotoStatistic } = this.props
        const monthStart = moment().clone().startOf('month').format('DD-MM-YYYY')
        const monthEnd   = moment().clone().endOf('month').format('DD-MM-YYYY')

        _.isEmpty(storePhotoStatistic) && dispatch(astroActions.getFITStat())
        _.isEmpty(storeMeteoArchive) && dispatch(meteoActions.getArchive(monthStart, monthEnd))
        _.isEmpty(storePhotoArchive) && dispatch(astroActions.getEventCalendarFIT())
    }

    updateData = () => {}

    handleEventPress = selected => {
        // this.setState({ showModalEvent: true })
        //
        // const { dispatch } = this.props
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

        // dispatch(astroActions.getEventCalendarFIT(moment(date).format('DD.MM.YYYY')))
        dispatch(meteoActions.getArchive(monthStart, monthEnd))
    }

    render() {
        const { storePhotoStatistic, storePhotoArchive, storeMeteoArchive } = this.props // graphic
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
                        data={storePhotoStatistic}
                    />
                    <EventCalendar
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
        storePhotoArchive: state.astro.FITEvent,
        storeMeteoArchive: state.meteo.archiveData
        // graphic: state.astro.graphic,
    }
}

export default connect(mapStateToProps)(Main)