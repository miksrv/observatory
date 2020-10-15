import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

import getTimeFromSec from '../data/functions'

const Statistic = (props) => {
    const { data } = props

    const informers = [
        {name: 'Кадров', icon: 'photo', value: data.frames},
        {name: 'Выдержка (ч:м)', icon: 'clock outline', value: getTimeFromSec(data.exposure)},
        {name: 'Объектов', icon: 'star outline', value: data.objects},
        {name: 'Данных (Гб)', icon: 'disk', value: ((data.frames * 32.2) / 1024).toFixed(1)}
    ]

    return (
        informers.map((item, key) => {
            return (
                <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                    <div className='informer'>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={5} className='icon-container'>
                                    <Icon name={item.icon} />
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <div className='value'>{item.value}</div>
                                    <div className='info'>{item.name}</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>
            )
        })
    )
}

export default Statistic