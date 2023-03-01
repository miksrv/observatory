import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import Camera from 'components/camera/Camera'
import RelayList from 'components/relay-list/RelayList'
import Sensors from 'components/sensors/Sensors'

import AstronomyCalc from './AstronomyCalc'
import './styles.sass'
import WeatherCurrent from './weatherCurrent'

const Dashboard: React.FC = () => {
    useEffect(() => {
        document.title = 'Статус телескопа - Обсерватория'
    })

    return (
        <Grid>
            <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
            >
                <WeatherCurrent />
                <br />
                <RelayList />
            </Grid.Column>
            <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
            >
                <Camera
                    cameraURL={`${process.env.REACT_APP_API_HOST}camera/get/2`}
                />
            </Grid.Column>
            <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
            >
                <AstronomyCalc />
                <br />
                <Sensors />
            </Grid.Column>
            <Grid.Column
                computer={8}
                tablet={8}
                mobile={16}
            >
                <Camera
                    cameraURL={`${process.env.REACT_APP_API_HOST}camera/get/1`}
                    interval={30}
                />
            </Grid.Column>
        </Grid>
    )
}

export default Dashboard
