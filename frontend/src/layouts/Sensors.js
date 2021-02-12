/**
 * React weather icons: https://react-icons.netlify.com/#/icons/wi
 */

import React  from 'react'

import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import { WiThermometer, WiThermometerExterior, WiHumidity } from 'react-icons/wi'
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import { GiElectric } from 'react-icons/gi'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RiLightbulbFlashLine } from 'react-icons/ri'

import _ from 'lodash'

const Sensor = (params) => {

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

    const WeatherIcon = icons[params.widget.icon]
    const TrendIcon  = params.data.trend > 0 ? trend['up'] : trend['down']

    return (
        <Grid.Column computer={4} tablet={8} mobile={8}>
            <div className={'card sensor ' + params.widget.color}>
                {_.isEmpty(params.data) && (
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                )}
                <h5 className='title'>{params.widget.name}</h5>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12} className='icon-container'>
                            <div className='value'>{params.data.value}
                                {(typeof params.widget.sign !== 'undefined' && (
                                    <span className='sign'>{params.widget.sign}</span>
                                ))}
                            </div>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <WeatherIcon className='icon' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid className='grid-info' columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            {(typeof params.data.info !== 'undefined' && (
                                <div className='info'>({params.data.info})</div>
                            ))}
                            {(params.widget.trend === true && params.data.trend !== 0 && (
                                <div className='trend'>
                                    <TrendIcon className={(params.data.trend > 0 ? 'trend-up' : 'trend-down')} /> {params.data.trend > 0 ? '+' : ''}{params.data.trend}
                                </div>
                            ))}
                        </Grid.Column>
                        <Grid.Column>
                            {(typeof params.data.max !== 'undefined' && (
                                <div className='maxmin'>MAX<div>{params.data.max}</div></div>
                            ))}
                        </Grid.Column>
                        <Grid.Column>
                            {(typeof params.data.min !== 'undefined' && (
                                <div className='maxmin'>MIN<div>{params.data.min}</div></div>
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Grid.Column>
    )
}

export default Sensor