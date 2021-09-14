import React  from 'react'

import { Dimmer, Loader, Grid } from 'semantic-ui-react'
import { WiThermometer, WiThermometerExterior, WiHumidity } from 'react-icons/wi'
// import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'

import _ from 'lodash'

const Sensor = (params) => {
    const { astro, meteo } = params

    // const trend = {
    //     up: IoIosArrowRoundUp,
    //     down: IoIosArrowRoundDown
    // }

    // const WeatherIcon = icons[params.widget.icon]
    // const TrendIcon  = params.data.trend > 0 ? trend['up'] : trend['down']

    const getSensorVal = (array, scope) => !_.isEmpty(array) ? array[scope].value : 0
    const getSensorTrend = (array, scope) => {
        if (_.isEmpty(array)) return ''

        let trendVal = array[scope].trend
        // let TrendIcon  = trendVal > 0 ? trend['up'] : trend['down']

        return (<>({trendVal > 0 && '+'}{trendVal})</>)
    }

    return (
        <div className='card padding devices-sensor'>
            {(_.isEmpty(meteo) || _.isEmpty(astro)) && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <Grid>
                <Grid.Column computer={8} tablet={8} mobile={16}>
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
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
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
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Sensor