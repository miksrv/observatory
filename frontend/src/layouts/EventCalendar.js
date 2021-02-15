import React from 'react'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import _ from 'lodash'

const EventCalendar = (params) => {
    const localizer = momentLocalizer(moment)

    const createMeteoEvents = () => {
        if (_.isEmpty(params.meteo)) return []

        const { data } = params.meteo
        let result = []

        Object.keys(data).map(function(key) {
            result.push({
                'title': data[key].t2 + '°C, ' + data[key].h + '%, ' + data[key].lux + ' lux',
                'start': moment(key, 'DD-MM-YYYY').toDate(),
                'end'  : moment(key, 'DD-MM-YYYY').toDate(),
                'type' :'meteo'
            })
        })

        return result
    }

    const createPhotoEvents = () => {
        if (_.isEmpty(params.astro.data) || params.astro.status === false) return []

        const { data } = params.astro
        let result = []

        Object.keys(data).map(function(key) {
            result.push({
                'title': data[key].frames + ' кадров, ' + data[key].exposure + ' мин',
                'start': moment(key, 'DD-MM-YYYY').toDate(),
                'end'  : moment(key, 'DD-MM-YYYY').toDate(),
                'type' :'astro'
            })
        })

        return result
    }

    return (
        <Grid>
            <Grid.Column computer={16} tablet={16} mobile={16}>
                <div className='card'>
                    {_.isNull(params.meteo) && (
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    )}
                    <Calendar
                        defaultDate={new Date()}
                        localizer={localizer}
                        events={[...createMeteoEvents(), ...createPhotoEvents()]}
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