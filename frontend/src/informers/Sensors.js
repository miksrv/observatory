import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

const Sensors = (props) => {
    const { data } = props

    const informers = [
        {name: 'Помещение', icon: 'thermometer half', value: data.sensors.t.value},
        {name: 'Шкаф', icon: 'thermometer half', value: data.sensors.t1.value},
        {name: 'БП', icon: 'thermometer half', value: data.sensors.t2.value},
        {name: 'Зеркало', icon: 'thermometer half', value: data.sensors.t3.value}
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
                                    <div className='value'>{item.value} °C</div>
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

export default Sensors