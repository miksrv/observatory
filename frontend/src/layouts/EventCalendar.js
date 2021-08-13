import React from 'react'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import { declOfNum } from '../data/functions'
import moment from 'moment'

import _ from 'lodash'

const EventCalendar = (params) => {
    const localizer = momentLocalizer(moment)

    const createMeteoEvents = () => {
        if (_.isEmpty(params.meteo)) return []

        const { data } = params.meteo
        let result = []

        Object.keys(data).map((key) => {
            return result.push({
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

        Object.keys(data).map((key) => {
            return result.push({
                'title': `${data[key].frames} ${declOfNum(data[key].frames, ['кадр', 'кадра', 'кадров'])}, ${data[key].exposure} мин`,
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
                    {params.meteo === null && (
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    )}
                    <Calendar
                        defaultDate={new Date()}
                        localizer={localizer}
                        events={[...params.moon, ...createMeteoEvents(), ...createPhotoEvents()]}
                        startAccessor="start"
                        endAccessor="end"
                        popup={true}
                        views={['month']}
                        style={{ height: 700 }}
                        messages={{
                            today: 'сегодня',
                            previous: '<',
                            next: '>',
                            showMore: function showMore(total) {
                                return '+ Еще ' + total
                            }
                        }}
                        onSelectEvent={params.fGetEvent}
                        onNavigate={params.fNavigate}
                        eventPropGetter={(event) => {
                            return {
                                className: event.type + (!_.isEmpty(event.class) ? ' ' + event.class : '')
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