import moment from 'moment'
import SunCalc from 'suncalc'
import phases from '../data/moon_phase'

const lon = 55.121607,
      lat = 51.774374

export const moonPhrase = (monthStart, monthEnd) => {
    monthStart = moment(monthStart, 'DD-MM-YYYY').clone().startOf('month')
    monthEnd = moment(monthEnd, 'DD-MM-YYYY').clone().endOf('month')

    let calendar = [],
        dayIterator = monthStart

    while (dayIterator <= monthEnd) {
        let _tmpDate  = dayIterator.toDate()
        let _tmpTimes = SunCalc.getMoonTimes(_tmpDate, lat, lon)

        calendar.push({
            'title': phases[(Math.round(SunCalc.getMoonIllumination(_tmpDate).phase * 8) / 8)] + ' ↑'
                    + moment(_tmpTimes.rise).format('H:mm') + ' ↓'
                    + moment(_tmpTimes.set).format('H:mm'),
            'start': _tmpDate,
            'end': _tmpDate,
            'type': 'moon'
        })

        dayIterator = dayIterator.clone().add(1, 'd')
    }

    return calendar
}

export default (moonPhrase)