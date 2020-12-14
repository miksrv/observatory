import React, { useState, useEffect } from 'react'
import { Grid, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react'

import _ from 'lodash'

const Relay = (props) => {
    const { data, auth } = props
    const [ relayList, setRelayList ] = useState([
        {
            name: 'Реле №1',
            description: 'AC/DC Блок питания',
            loader: false,
            value: ! _.isEmpty(data) ? data.data.relay[0][0] : 0
        },
        {
            name: 'Реле №2',
            description: 'Монтировка HEQ5',
            loader: false,
            value: ! _.isEmpty(data) ? data.data.relay[1][1] : 0
        },
        {
            name: 'Реле №3',
            description: 'Камера ASI 1600MM',
            loader: false,
            value: ! _.isEmpty(data) ? data.data.relay[2][2] : 0
        },
        {
            name: 'Реле №4',
            description: 'Фокусер ZWO EAF',
            loader: false,
            value: ! _.isEmpty(data) ? data.data.relay[3][3] : 0
        },
        {
            name: 'Реле №5',
            description: 'Обдув телескопа',
            loader: false,
            value: ! _.isEmpty(data) ? data.data.relay[4][4] : 0
        }
    ])

    const handleSwitch = (data, key) => {
        // relayList[key].loader = true

        // console.log('handleSwitch', key, data);
        console.log('handleSwitch', relayList);
        props.handleSwitch(key)
    }

    console.log(relayList)

    return (
        <Grid columns={5}>
            {relayList.map((item, key) => {
            return (
                <Grid.Column key={key}>
                    <div className={'relay ' + ((item.value === 1) ? 'switch-on' : 'switch-off')}>
                        {
                            (_.isEmpty(data) || item.loader) && (
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
                                    {item.loader}
                                    <Checkbox
                                        toggle
                                        checked={(! _.isEmpty(data) ? data.data.relay[key][key] : 0)}
                                        className='checkbox'
                                        disabled={!auth}
                                        onChange={() => handleSwitch(item, key)}
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