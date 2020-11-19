import React from 'react'
import { Grid } from 'semantic-ui-react'

const Relay = (props) => {
    const { data } = props

    const informers = [
        {name: 'ВВОД 12В', icon: 'lightning', value: data.data.relay[0][0]},
        {name: 'Монтировка', icon: 'lightning', value: data.data.relay[1][1]},
        {name: 'Камера', icon: 'lightning', value: data.data.relay[2][2]},
        {name: 'Фокусер', icon: 'lightning', value: data.data.relay[3][3]}
    ]

    return (
        informers.map((item, key) => {
            return (
                <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                    <div className='informer'>
                        <div className='value'><span className={(item.value === 1) ? 'switch-on' : 'switch-off'}></span></div>
                        <div className='info'>{item.name}</div>
                    </div>
                </Grid.Column>
            )
        })
    )
}

export default Relay