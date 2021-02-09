import React from 'react'
import moment from 'moment'
import { Grid } from 'semantic-ui-react'
import { WiSunset } from 'react-icons/wi'

const Sun = (props) => {
    const { data } =  props

    return (
        <Grid.Column computer={6} tablet={8} mobile={16}>
            <div className='informer sun'>
                <Grid>
                    <Grid.Column width={5} className='icon-container'>
                        <WiSunset className='icon' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <div className='title'>Продолжительность дня</div>
                        <div className='description'>Рассвет: <span className='value'>{moment.unix(data.rise).format("H:mm")}</span></div>
                        <div className='description'>Закат: <span className='value'>{moment.unix(data.set).format("H:mm")}</span></div>
                    </Grid.Column>
                </Grid>
            </div>
        </Grid.Column>
    )
}

export default Sun