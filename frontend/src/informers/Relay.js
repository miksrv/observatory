import React from 'react'
import { Grid, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react'

import _ from 'lodash'

const Relay = (props) => {
    const { data } = props

    const relayList = [
        {
            name: 'Реле №1',
            description: 'AC/DC Блок питания',
            value: ! _.isEmpty(data) ? data.data.relay[0][0] : 0
        },
        {
            name: 'Реле №2',
            description: 'Монтировка HEQ5',
            value: ! _.isEmpty(data) ? data.data.relay[1][1] : 0
        },
        {
            name: 'Реле №3',
            description: 'Камера ASI 1600MM',
            value: ! _.isEmpty(data) ? data.data.relay[2][2] : 0
        },
        {
            name: 'Реле №4',
            description: 'Фокусер ZWO EAF',
            value: ! _.isEmpty(data) ? data.data.relay[3][3] : 0
        },
        {
            name: 'Реле №5',
            description: 'Обдув телескопа',
            value: ! _.isEmpty(data) ? data.data.relay[4][4] : 0
        }
    ]

    return (
        <Grid columns={5}>
            {relayList.map((item, key) => {
            return (
                <Grid.Column key={key}>
                    <div className={'relay ' + ((item.value === 1) ? 'switch-on' : 'switch-off')}>
                        {
                            _.isEmpty(data) && (
                                <Dimmer active>
                                    <Loader />
                                </Dimmer>
                            )
                        }
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Icon name='plug' className='icon' />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Checkbox
                                        toggle
                                        checked={item.value}
                                        className='checkbox'
                                        disabled={true}
                                    />
                                    <div className='title'><span className='state'></span>{item.name}</div>
                                    <div className='desc'>{item.description}</div>
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

export default Relay