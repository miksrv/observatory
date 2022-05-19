import React, { useState } from 'react'
import moment from 'moment'
import SunCalc from 'suncalc'
import { Grid } from 'semantic-ui-react'

import MoonPhase from '../../components/moonPhase'
import SunIcon from '../../components/moonPhase/images/sun.png'

const LAT = 51.7
const LON =  55.2

const AstronomyCalc: React.FC = () => {
    const moonTimes = SunCalc.getMoonTimes(moment(), LAT, LON)
    const sunTimes = SunCalc.getTimes(moment(), LAT, LON)


    const [sunAltitude, setSunAltitude] = useState<string>('00.000');
    const [sunAzimuth, setSunAzimuth] = useState<string>('00.000');
    const [moonAltitude, setMoonAltitude] = useState<string>('00.000');
    const [moonAzimuth, setMoonAzimuth] = useState<string>('00.000');

    const tick = () => {
        const sunPosition = SunCalc.getPosition(moment(), LAT, LON)
        const moonPosition = SunCalc.getMoonPosition(moment(), LAT, LON)

        setSunAltitude((sunPosition.altitude * 180 / Math.PI).toFixed(3))
        setSunAzimuth((sunPosition.azimuth * 180 / Math.PI).toFixed(3))

        setMoonAltitude((moonPosition.altitude * 180 / Math.PI).toFixed(3))
        setMoonAzimuth((moonPosition.azimuth * 180 / Math.PI).toFixed(3))
    }

    React.useEffect(() => {
        const timer = setInterval(() => tick(), 1000)

        return () => clearInterval(timer)
    })

    return (
        <div className='box astronomy-calc'>
            <Grid>
                <Grid.Column width={8}>
                    <h4><img src={SunIcon} className='icon' alt=''/> Положение Солнца</h4>
                    <div>↑ Окончание сумерек: <strong>{moment(sunTimes.dawn).format('H:mm')}</strong></div>
                    <div>↓ Начало сумерек: <strong>{moment(sunTimes.dusk).format('H:mm')}</strong></div>
                    <div>Высота: <strong>{sunAltitude}°</strong></div>
                    <div>Азимут: <strong>{sunAzimuth}°</strong></div>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h4><MoonPhase date={moment()} /> Положение Луны</h4>
                    <div>↑ Восход <strong>{moment(moonTimes.rise).format('H:mm')}</strong></div>
                    <div>↓ Закат <strong>{moment(moonTimes.set).format('H:mm')}</strong></div>
                    <div>Высота: <strong>{moonAltitude}°</strong></div>
                    <div>Азимут: <strong>{moonAzimuth}°</strong></div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default AstronomyCalc