import moment from 'moment'
import SunCalc from 'suncalc'
import phases from '../data/moon_phase'

export const moonPhrase = (monthStart, monthEnd) => {
    monthStart = moment(monthStart, 'DD-MM-YYYY').clone().startOf('month')
    monthEnd = moment(monthEnd, 'DD-MM-YYYY').clone().endOf('month')

    let calendar = [],
        dayIterator = monthStart

    while (dayIterator <= monthEnd) {
        let _tmpDate  = dayIterator.toDate()
        let _tmpTimes = SunCalc.getMoonTimes(_tmpDate, process.env.REACT_APP_LAT, process.env.REACT_APP_LON)

        calendar.push({ // phases[(Math.round(SunCalc.getMoonIllumination(_tmpDate).phase * 8) / 8)]
            'title': ' ↑'
                    + moment(_tmpTimes.rise).format('H:mm') + ' ↓'
                    + moment(_tmpTimes.set).format('H:mm'),
            'start': _tmpDate,
            'end': _tmpDate,
            'type': 'moon',
            'class': phases[(Math.round(SunCalc.getMoonIllumination(_tmpDate).phase * 8) / 8)]
        })

        dayIterator = dayIterator.clone().add(1, 'd')
    }

    return calendar
}

export default (moonPhrase)