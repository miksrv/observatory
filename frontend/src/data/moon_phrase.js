import moment from 'moment'
import SunCalc from 'suncalc'

const lon = 55.121607,
      lat = 51.774374

const phases = {
    '1'    : '🌑', // new moon
    '0'    : '🌒',
    '0.125': '🌒',
    '0.25' : '🌓',
    '0.375': '🌔',
    '0.5'  : '🌕', // full moon
    '0.625': '🌖',
    '0.75' : '🌗',
    '0.875': '🌘',
}

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