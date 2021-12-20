import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { Button } from 'semantic-ui-react'

import RenderCalendar from './renderCalendar'

type TCalendarProps = {
    eventsWeather: any
    eventsTelescope: any
}

const Calendar: React.FC<TCalendarProps> = (props) => {
    const { eventsWeather, eventsTelescope } = props
    const [ dateObject, setDateObject ] = useState<Moment>(moment())
    const weekDayShort = moment.weekdaysShort(true)

    return (
        <div className='box table calendar'>
            <div className='calendar-toolbar'>
                <Button
                    size='mini'
                    color='green'
                    icon='angle left'
                    onClick={() => setDateObject(moment(dateObject.subtract(1, 'month')))}
                />
                <span className='current-month'>{dateObject.format('MMMM Y')}</span>
                <Button
                    size='mini'
                    color='green'
                    icon='angle right'
                    onClick={() => setDateObject(moment(dateObject.add(1, 'month')))}
                />
            </div>
            <div className='grid'>
                <table className='calendar-day'>
                    <thead>
                    <tr>{weekDayShort.map((day) => (<th key={day}>{day}</th>))}</tr>
                    </thead>
                    <tbody>
                        <RenderCalendar
                            dateObject={dateObject}
                            eventsWeather={eventsWeather}
                            eventsTelescope={eventsTelescope}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar