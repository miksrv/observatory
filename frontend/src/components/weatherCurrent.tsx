import React from 'react'
import moment from 'moment'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import { useGetWeatherCurrentQuery } from '../app/observatoryApi'
import { timeAgo } from '../functions/helpers'

const getRange = (value: number | null, min: number, max: number): number => {
    if (value === null)
        return 3

    const percent = 15
    const calcVal = value * (1 + percent / 100)

    if (value === 0) {
        return 0
    } else if (value > max || value < min) {
        return 2
    } else if (calcVal > max || calcVal < min) {
        return 1
    }

    return 0
}

const WeatherCurrent: React.FC = () => {
    const { data, isLoading } = useGetWeatherCurrentQuery(null, { pollingInterval: 60 * 1000 })

    const lastUpdate = data ? data.payload.timestamp.server - data.payload.timestamp.update : 0

    const rangeTemp = data && getRange(data.payload.conditions.temperature, -24, 24)
    const rangeHumd = data && getRange(data.payload.conditions.humidity, 0, 75)
    const rangeCloud = data && getRange(data.payload.conditions.clouds, 0, 50)
    const rangeWind = data && getRange(data.payload.conditions.wind_speed, 0, 10)
    const rangeRain = data && getRange(data.payload.conditions.precipitation, .1, .1)
    const rangeGust = data && getRange(data.payload.conditions.precipitation, 0, 8)

    let weatherState: number
    let weatherCondition: string

    if (rangeTemp === 0 && rangeHumd === 0 && rangeCloud === 0 && rangeWind === 0 && rangeRain === 0 && rangeGust === 0) {
        weatherState = 0
        weatherCondition = 'Безопасно'
    } else if (rangeTemp === 2 || rangeHumd === 2 || rangeCloud === 2 || rangeWind === 2 || rangeRain === 2 || rangeGust === 2) {
        weatherState = 2
        weatherCondition = 'Критическое'
    } else {
        weatherState = 1
        weatherCondition = 'Опасно'
    }

    return isLoading ?
        <div className='box weather loader'>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </div>
        :
        <div className='box weather'>
            <h4>Состояние погоды: <span className={`state-${weatherState}`}>{weatherCondition}</span></h4>
            <div className='small update'>
                Обновлено: <b>{data ? moment.unix(data.payload.timestamp.update).format('DD.MM.Y, H:mm:ss') : 'Загрузка...'}</b>
                {' '}
                ({timeAgo(lastUpdate)})
            </div>
            <Grid>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeTemp}`} /> Температура: <b className='val'>{data?.payload.conditions.temperature}℃</b>
                    </div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeHumd}`} /> Влажность: <b className='val'>{data?.payload.conditions.humidity}%</b>
                    </div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeCloud}`} /> Облачность: <b className='val'>{data?.payload.conditions.clouds}%</b>
                    </div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeWind}`} /> Скорость ветра: <b className='val'>{data?.payload.conditions.wind_speed} м\с</b>
                    </div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeRain}`} /> Осадки: <b className='val'>{data?.payload.conditions.precipitation} мм</b>
                    </div>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <div className='key'>
                        <span className={`weather-${rangeRain}`} /> Порывы ветра: <b className='val'>{data?.payload.conditions.wind_gust} м\с</b>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
}

export default WeatherCurrent