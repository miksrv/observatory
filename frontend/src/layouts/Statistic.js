import React from 'react'
import { Grid, Icon, Dimmer, Loader } from 'semantic-ui-react'

import { getTimeFromSec } from '../data/functions'

import _ from 'lodash'

const Statistic = (props) => {
    const { data } = props

    const informers = [
        {
            name: 'Кадров',
            icon: 'photo',
            value: ! _.isEmpty(data) ? data.frames : 0
        },
        {
            name: 'Выдержка (ч:м)',
            icon: 'clock outline',
            value: ! _.isEmpty(data) ? getTimeFromSec(data.exposure) : 0
        },
        {
            name: 'Объектов',
            icon: 'star outline',
            value: ! _.isEmpty(data) ? data.objects : 0
        },
        {
            name: 'Данных (Гб)',
            icon: 'disk',
            value: ! _.isEmpty(data) ? _.round(data.filesize / 1024, 1) : 0
        }
    ]

    return (
        <Grid>
            {informers.map((item, key) => {
                return (
                    <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                        <div className='card statistic'>
                            {
                                _.isEmpty(data) && (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )
                            }
                            <div className='image'>
                                <Icon name={item.icon} />
                            </div>
                            <div>
                                <div className='value'>{item.value}</div>
                                <div className='info'>{item.name}</div>
                            </div>
                        </div>
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

export default Statistic