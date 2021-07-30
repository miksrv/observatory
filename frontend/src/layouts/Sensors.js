import React  from 'react'

import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import { WiThermometer, WiThermometerExterior, WiHumidity } from 'react-icons/wi'
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import { GiElectric } from 'react-icons/gi'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RiLightbulbFlashLine } from 'react-icons/ri'

import _ from 'lodash'

const Sensor = (params) => {
    const { astro, meteo } = params

    const icons = {
        temp: WiThermometer,
        extemp: WiThermometerExterior,
        humd: WiHumidity,
        volt: GiElectric,
        strength: HiOutlineLightBulb,
        power: RiLightbulbFlashLine
    };

    const trend = {
        up: IoIosArrowRoundUp,
        down: IoIosArrowRoundDown
    }

    // const WeatherIcon = icons[params.widget.icon]
    // const TrendIcon  = params.data.trend > 0 ? trend['up'] : trend['down']

    console.log('params', meteo)

    let tempOut = !_.isEmpty(meteo) ? meteo.t2.value : 0,
        tempOutTrend = !_.isEmpty(meteo) ? meteo.t2.trend : 0,
        tempIn = !_.isEmpty(astro) ? astro.t.value : 0,
        tempInTrend = !_.isEmpty(astro) ? astro.t.trend : 0

    let humdOut = !_.isEmpty(meteo) ? meteo.h.value : 0,
        humdOutTrend = !_.isEmpty(meteo) ? meteo.h.trend : 0,
        humdIn = !_.isEmpty(astro) ? astro.h.value : 0,
        humdInTrend = !_.isEmpty(astro) ? astro.h.trend : 0

    let temp1 = !_.isEmpty(astro) ? astro.t1.value : 0,
        temp1Trend = !_.isEmpty(astro) ? astro.t1.trend : 0,
        temp2 = !_.isEmpty(astro) ? astro.t2.value : 0,
        temp2Trend = !_.isEmpty(astro) ? astro.t2.trend : 0,
        temp3 = !_.isEmpty(astro) ? astro.t3.value : 0,
        temp3Trend = !_.isEmpty(astro) ? astro.t3.trend : 0

    const getSensorVal = (array, scope) => !_.isEmpty(array) ? array[scope].value : 0
    const getSensorTrend = (array, scope) => {
        if (_.isEmpty(array)) return ''

        let trendVal = array[scope].trend
        let TrendIcon  = trendVal > 0 ? trend['up'] : trend['down']

        return (<>({trendVal > 0 && '+'}{trendVal})</>)
    }

    return (
        <div className='card padding devices-sensor'>
            {(_.isEmpty(meteo) || _.isEmpty(astro)) && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <div className='item'>
                <div className='name'><WiHumidity className='icon' />Влажность на улице \ в обсерватории (%)</div>
                <div className='value'>
                    {getSensorVal(meteo, 'h')} {getSensorTrend(meteo, 'h')} \ {getSensorVal(astro, 'h')} {getSensorTrend(astro, 'h')}</div>
            </div>
            <div className='item'>
                <div className='name'><WiThermometer className='icon'/>Температура на улице \ в обсерватории (℃)</div>
                <div className='value'>
                    {getSensorVal(meteo, 't2')} {getSensorTrend(meteo, 't2')} \ {getSensorVal(astro, 't')} {getSensorTrend(astro, 't')}
                </div>
            </div>
            <div className='item'>
                <div className='name'><WiThermometerExterior className='icon'/>Температура главного зеркала (℃)</div>
                <div className='value'>{getSensorVal(astro, 't2')} {getSensorTrend(astro, 't2')}</div>
            </div>
            <div className='item'>
                <div className='name'><WiThermometerExterior className='icon'/>Температура блока питания (℃)</div>
                <div className='value'>{getSensorVal(astro, 't1')} {getSensorTrend(astro, 't1')}</div>
            </div>
            <div className='item'>
                <div className='name'><WiThermometerExterior className='icon'/>Температура серверного шкафа (℃)</div>
                <div className='value'>{getSensorVal(astro, 't3')} {getSensorTrend(astro, 't3')}</div>
            </div>
        </div>
    )
}

export default Sensor