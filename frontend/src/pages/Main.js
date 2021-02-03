import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid } from 'semantic-ui-react' // , Dimmer, Loader, Grid

import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import MainContainer from '../components/MainContainer'
import FullTable from '../layouts/FullTable'
import Statistic from '../informers/Statistic'
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
        const localizer = momentLocalizer(moment)
        let calendarEvents = []

        if (!_.isEmpty(meteoEvents.data)) {
            meteoEvents.data.map((item) => {
                item.start = moment(item.start, 'DD-MM-YYYY').toDate()
                item.end   = moment(item.end, 'DD-MM-YYYY').toDate()
            })

            calendarEvents = [...calendarEvents, ...meteoEvents.data]
        }

        if (!_.isEmpty(FITEvent.data)) {
            FITEvent.data.map((item) => {
                item.start = moment(item.start, 'DD-MM-YYYY').toDate()
                item.end   = moment(item.end, 'DD-MM-YYYY').toDate()
            })

            calendarEvents = [...calendarEvents, ...FITEvent.data]
        }

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Statistic data={FITStat} />
                    <Grid>
                        <Grid.Column computer={16} tablet={16} mobile={16}>
                            <div className='informer container'>
                                {_.isEmpty(meteoEvents) && (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )}
                                <Calendar
                                    defaultDate={new Date()}
                                    localizer={localizer}
                                    events={calendarEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    views={['month']}
                                    style={{ height: 500 }}
                                    messages={{
                                        today: 'сегодня',
                                        previous: '<',
                                        next: '>',
                                        showMore: function showMore(total) {
                                            return 'еще ' + total;
                                        }
                                    }}
                                    onSelectEvent={this.handleEventPress}
                                    onNavigate={this.handleNavigatePress}
                                    eventPropGetter={(event, start, end, isSelected) => {
                                            return {
                                                className: event.type,
                                            }
                                        }
                                    }
                                />
                            </div>
                        </Grid.Column>
                    </Grid>

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