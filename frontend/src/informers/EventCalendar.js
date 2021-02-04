import React from 'react'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import _ from 'lodash'

const EventCalendar = (params) => {
    const localizer = momentLocalizer(moment)
    let calendarEvents = []

    if (!_.isEmpty(params.meteo.data)) {
        params.meteo.data.map((item) => {
            item.start = moment(item.start, 'DD-MM-YYYY').toDate()
            item.end   = moment(item.end, 'DD-MM-YYYY').toDate()
        })

        calendarEvents = [...calendarEvents, ...params.meteo.data]
    }

    if (!_.isEmpty(params.astro.data)) {
        params.astro.data.map((item) => {
            item.start = moment(item.start, 'DD-MM-YYYY').toDate()
            item.end   = moment(item.end, 'DD-MM-YYYY').toDate()
        })

        calendarEvents = [...calendarEvents, ...params.astro.data]
    }

    return (
        <Grid>
            <Grid.Column computer={16} tablet={16} mobile={16}>
                <div className='informer container'>
                    {_.isEmpty(params.meteo) && (
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
                        onSelectEvent={params.fGetEvent}
                        onNavigate={params.fNavigate}
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
    )
}

export default EventCalendar