import React from 'react'
import moment, { Moment } from 'moment'
import { Icon } from 'semantic-ui-react'
import SunCalc from 'suncalc'

import MoonPhase from '../moonPhase'
import SunIcon from '../moonPhase/images/sun.png'

type TRenderCalendarProps = {
    dateObject: Moment
    eventsWeather: any
    eventsTelescope: any
}

const RenderCalendar: React.FC<TRenderCalendarProps> = (props) => {
    const { dateObject, eventsWeather, eventsTelescope } = props

    const daysInMonth: number = dateObject.daysInMonth()
    const firstDayOfMonth: number = parseInt(moment(dateObject).startOf('month').format('d'))
    const isCurrentMonth = moment(dateObject).isSame(new Date(), 'month')

    const getWeatherClass = (cond: number | undefined) => {
        if (typeof cond === 'undefined') return ''

        if (cond <= 20) return 'green'
        else if (cond >= 21 && cond <= 60) return 'orange'

        return 'red'
    }

    let blanks = []
    for (let i = 1; i < firstDayOfMonth; i++) {
        blanks.push(<td className='calendar-day empty'></td>)
    }

    let daysMonth = []

    for (let d = 1; d <= daysInMonth; d++) {
        const currentDate = moment(dateObject).startOf('month').add(d - 1, 'days')
        const currentDay = (isCurrentMonth && d === parseInt(dateObject.format('DD'))) ? 'today' : ''
        const moonTimes = SunCalc.getMoonTimes(currentDate, 51.7, 55.2)
        const sunTimes = SunCalc.getTimes(currentDate, 51.7, 55.2)

        const itemWeatherEvent = eventsWeather.filter((item: any) => currentDate.isSame(item.date, 'day')).pop()
        const itemAstroEvents = eventsTelescope.filter((item: any) => currentDate.isSame(item.date, 'day')).pop()

        daysMonth.push(
            <td key={d} className={`calendar-day ${currentDay}`}>
                <div className={`day ${getWeatherClass(itemWeatherEvent?.clouds)}`} onClick={e => console.log('onDayClick', e, d)}>
                    {(d < 10 ? `0${d}` : d)}
                </div>
                <div className='event moon'>
                    <MoonPhase date={currentDate} /> ↑ {moment(moonTimes.rise).format('H:mm')} ↓ {moment(moonTimes.set).format('H:mm')}
                </div>
                <div className='event sun'>
                    <img src={SunIcon} className='icon' alt='' /> ↑ {moment(sunTimes.nightEnd).format('H:mm')} ↓ {moment(sunTimes.night).format('H:mm')}
                </div>
                {itemWeatherEvent && (
                    <div className='event weather'>
                        <Icon name='cloud' />{itemWeatherEvent.clouds}{' '}
                        <Icon name='thermometer' />{itemWeatherEvent.temperature}{' '}
                        <Icon name='send' />{itemWeatherEvent.wind_speed}
                    </div>
                )}
                {itemAstroEvents && (
                    <div className='event telescope'>
                        <Icon name='star outline' />{itemAstroEvents.objects.length}{' '}
                        <Icon name='clock outline' />{itemAstroEvents.total.exposure}{' '}
                        <Icon name='image outline' />{itemAstroEvents.total.frames}
                    </div>
                )}
            </td>
        );
    }

    let totalSlots = [...blanks, ...daysMonth]
    let rows: any = []
    let cells: any = []

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row)
        } else {
            rows.push(cells)
            cells = []
            cells.push(row)
        }
        if (i === totalSlots.length - 1) {
            rows.push(cells)
        }
    })

    let daysinmonth = rows.map((d: any, i: any) => {
        if ( ! d.length) return ''

        // Добавляем пустые строки в конце месяца
        if (d.length < 7) {
            // console.log('daysinmonth', d)
            for (let i = d.length; i < 7; i++) {
                d.push(<td key={i} className='calendar-day empty'></td>)
            }
        }

        return <tr>{d}</tr>
    })

    return daysinmonth
}

export default RenderCalendar