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
            value: ! _.isEmpty(data) ? data.filesize : 0
        }
    ]

    return (
        <Grid>
            {informers.map((item, key) => {
                return (
                    <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                        <div className='card'>
                            {
                                _.isEmpty(data) && (
                                    <Dimmer active>
                                        <Loader />
                                    </Dimmer>
                                )
                            }
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5} className='icon-container'>
                                        <div className='statistic-image'>
                                            <Icon name={item.icon} />
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={11}>
                                        <div className='statistic-value'>{item.value}</div>
                                        <div className='info'>{item.name}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

export default Statistic