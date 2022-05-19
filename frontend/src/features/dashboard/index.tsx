import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import RelayList from '../../components/relayList'
import Camera from '../../components/camera'
import WeatherCurrent from './weatherCurrent'
import AstronomyCalc from './AstronomyCalc'
import Sensors from '../../components/sensors'

import './styles.sass'

const Dashboard: React.FC = () => {
    useEffect(() => {
        document.title = 'Статус телескопа - Обсерватория'
    })

    return (
        <Grid>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <WeatherCurrent/>
                <br/>
                <RelayList/>
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <Camera
                    cameraURL={`${process.env.REACT_APP_API_HOST}camera/get/2`}
                />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <AstronomyCalc/>
                <br/>
                <Sensors/>
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <Camera
                    cameraURL={`${process.env.REACT_APP_API_HOST}camera/get/1`}
                    interval={30}
                />
            </Grid.Column>
        </Grid>
    )
}

export default Dashboard
