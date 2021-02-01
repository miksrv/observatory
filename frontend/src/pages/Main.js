import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid } from 'semantic-ui-react' // , Dimmer, Loader, Grid

import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

import MainContainer from '../components/MainContainer'
import FullTable from '../layouts/FullTable'
import Statistic from '../informers/Statistic'
// import ExpChart from '../informers/ExpChart'
// import Sun from '../informers/Sun'
// import Moon from '../informers/Moon'

// Calendar: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/date-navigation/

import * as observatoryActions from '../store/observatory/actions'

import _ from 'lodash'
// import TempGraphic from "../components/TempGraphic";

const
    // currentDate = new Date(),
    // defaultYear = currentDate.getFullYear(),
    // defaultMonth = currentDate.getMonth(),
    // defaultDay = currentDate.getDate()-4,
    events = [{
        // id: 0,
        // title: 'Hello, world',
        // allDay: false,
        // start: new Date(defaultYear, defaultMonth, defaultDay, 7, 0, 0),
        // end: new Date(defaultYear, defaultMonth, defaultDay, 21, 0, 0),
        // text: 'test',
        // type: 'meteo'
    }]

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getFITStat())
        dispatch(observatoryActions.getEventCalendarFIT())
        // dispatch(observatoryActions.fetchGraphData())
    }

    updateData = () => {}

    handleEventPress = (selectSlot) => {
        console.log('handleEventPress', selectSlot)
    }

    handleNavigatePress = (date) => {
        const { dispatch } = this.props

        dispatch(observatoryActions.getEventCalendarFIT(moment(date).format('DD.MM.YYYY')))

        //console.log('handleNavigatePress!', moment(date).format('MM.YYYY'))
    }

    render() {
        const { FITStat, FITEvent } = this.props // graphic

        const localizer = momentLocalizer(moment)

        !_.isEmpty(FITEvent.data) && (
            FITEvent.data.map((item) => {
                item.start = moment(item.start, 'DD-MM-YYYY').toDate()
                item.end   = moment(item.end, 'DD-MM-YYYY').toDate()
            })
        )

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
                                {_.isEmpty(FITEvent) && (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )}
                                <Calendar
                                    defaultDate={new Date()}
                                    localizer={localizer}
                                    events={!_.isEmpty(FITEvent.data) ? [...events, ...FITEvent.data] : [...events]}
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
        // graphic: state.observatory.graphic,
    }
}

export default connect(mapStateToProps)(Main)