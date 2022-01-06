import React from 'react'
import { Grid } from 'semantic-ui-react'

import RelayList from '../components/relayList'
import Camera from '../components/camera'
import WeatherCurrent from '../components/weatherCurrent'

const IP_CAMERA = typeof process.env.REACT_APP_WEBCAM1 === 'string' ? process.env.REACT_APP_WEBCAM1 : ''

const Dashboard: React.FC = () => {
    return (
        <Grid>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <RelayList />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16}>
                <Camera cameraURL={IP_CAMERA} />
            </Grid.Column>
            <Grid.Column width={8}>
                <WeatherCurrent />
            </Grid.Column>
            {/*<div>Состояние крыши, парковки, сервера</div>*/}
            {/*<div>Картинка с Allsky</div>*/}
        </Grid>
    )
}

export default Dashboard
