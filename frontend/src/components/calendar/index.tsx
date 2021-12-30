import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import { Button } from 'semantic-ui-react'
import { TWeatherMonth } from '../../app/types'

import RenderCalendar from './renderCalendar'

type TCalendarProps = {
    eventsWeather: TWeatherMonth[]
    eventsTelescope: any
    changeDate: (date: Moment) => void
}

const Calendar: React.FC<TCalendarProps> = (props) => {
    const { eventsWeather, eventsTelescope, changeDate } = props
    const [ dateObject, setDateObject ] = useState<Moment>(moment())
    const weekDayShort = moment.weekdaysShort(true)

    const handleChangeDate = (date: Moment) => {
        setDateObject(date)
        changeDate(date)
    }

    return (
        <div className='box table calendar'>
            <div className='calendar-toolbar'>
                <Button
                    size='mini'
                    color='green'
                    icon='angle left'
                    onClick={() => handleChangeDate(moment(dateObject.subtract(1, 'month')))}
                />
                <span className='current-month'>{dateObject.format('MMMM Y')}</span>
                <Button
                    size='mini'
                    color='green'
                    icon='angle right'
                    onClick={() => handleChangeDate(moment(dateObject.add(1, 'month')))}
                />
            </div>
            <div className='grid'>
                <table className='calendar-day'>
                    <thead>
                        <tr>{weekDayShort.map((day, key) => (<th key={key}>{day}</th>))}</tr>
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