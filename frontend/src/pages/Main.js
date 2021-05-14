import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import Statistic from '../layouts/Statistic'
import PhotoGrid from '../layouts/PhotoGrid'
import EventCalendar from '../layouts/EventCalendar'

// import ExpChart from '../informers/ExpChart'
// import TempGraphic from "../components/TempGraphic";

import * as astroActions from '../store/astro/actions'
import * as meteoActions from '../store/meteo/actions'

import moonPhrase from '../data/moon_phrase'

// import shuffle from '../data/functions'

import _ from 'lodash'

class Main extends Component {
    state = {
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
        let date = moment(selected.start)

        switch (selected.type) {
            case 'astro' :
                this.props.history.push(`/archive/${date.format('YYYY-MM-DD')}`)
                break

            case 'meteo' :
                window.open(`https://meteo.miksoft.pro/statistic/?start=${date.subtract(1,'d').format('DD-MM-YYYY')}&end=${moment(selected.start).format('DD-MM-YYYY')}`, '_blank')
                break

            default :
                break
        }
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
        const { storePhotoStatistic, storePhotoArchive, storeMeteoArchive, storePhotoList } = this.props // graphic
        const { calendarMoonPhrases } = this.state

        return (
            <MainContainer
                title='Сводка'
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Statistic
                        data={storePhotoStatistic}
                    />
                    <PhotoGrid
                        // photos={shuffle(storePhotoList).slice(0, 4)}
                        photos={storePhotoList.slice(0, 4)}
                        props={this.props}
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
        storePhotoArchive: state.astro.FITEvent,
        storeMeteoArchive: state.meteo.archiveData,
        storePhotoList: state.photo.dataList
        // graphic: state.astro.graphic,
    }
}

export default connect(mapStateToProps)(Main)