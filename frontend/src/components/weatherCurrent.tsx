import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useGetWeatherCurrentQuery } from '../app/observatoryApi'

const getRange = (value: number, min: number, max: number): number => {
    const percent = 15
    const calcVal = value * (1 + percent / 100)

    if (value > max || value < min) {
        return 2
    } else if (calcVal > max || calcVal < min) {
        return 1
    } else {
        return 0
    }
}

const WeatherCurrent: React.FC = () => {
    const { data, isFetching } = useGetWeatherCurrentQuery()

    const rangeTemp = data?.payload.temperature ? getRange(data.payload.temperature, -20, 20) : 3
    const rangeHumd = data?.payload.humidity ? getRange(data.payload.humidity, 80, 99) : 3
    const rangeCloud = data?.payload.clouds ? getRange(data.payload.clouds, 0, 50) : 3
    const rangeWind = data?.payload.wind_speed ? getRange(data.payload.wind_speed, 5, 10) : 3
    const rangeRain = data?.payload.precipitation ? getRange(data.payload.precipitation, .1, .1) : 3

    let weatherState: number = 3
    let weatherCondition: string = 'Неизвестно'

    if (rangeTemp === 0 && rangeHumd === 0 && rangeCloud === 0 && rangeWind === 0 && rangeRain === 0) {
        weatherState = 0
        weatherCondition = 'Безопасно'
    } else if (rangeTemp === 2 || rangeHumd === 2 || rangeCloud === 2 || rangeWind === 2 || rangeRain === 2) {
        weatherState = 2
        weatherCondition = 'Критическое'
    } else {
        weatherState = 1
        weatherCondition = 'Опасно'
    }

    return isFetching ?
        <div className='box loader'>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </div>
        :
        <div className='box weather'>
            <h4>Состояние погоды: <span className={`state-${weatherState}`}>{weatherCondition}</span></h4>
            <div className='key'>
                <span className={`weather-${rangeTemp}`} /> Температура: <b className='val'>{data?.payload.temperature}℃</b>
            </div>
            <div className='key'>
                <span className={`weather-${rangeHumd}`} /> Влажность: <b className='val'>{data?.payload.humidity}%</b>
            </div>
            <div className='key'>
                <span className={`weather-${rangeCloud}`} /> Облачность: <b className='val'>{data?.payload.clouds}%</b>
            </div>
            <div className='key'>
                <span className={`weather-${rangeWind}`} /> Скорость ветра: <b className='val'>{data?.payload.wind_speed} м\с</b>
            </div>
            <div className='key'>
                <span className={`weather-${rangeRain}`} /> Осадки: <b className='val'>{data?.payload.precipitation} мм</b>
            </div>
        </div>
}

export default WeatherCurrent