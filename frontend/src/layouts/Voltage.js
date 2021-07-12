import React  from 'react'

import { Grid, Dimmer, Loader } from 'semantic-ui-react'

const Voltage = (params) => {

    const INDEX = params.index

    let voltage = params.data['v' + INDEX],
        power   = params.data['p' + INDEX]

    let getCurrent = (volt, power) => volt > 0 ? ((power / 1000) / volt).toFixed(2): 0

    return (
        <Grid.Column computer={4} tablet={8} mobile={16}>
            {params.data !== false ? (
                <div className='card sensor astro'>
                    <div className='title'>{params.title}</div>
                    <div>Напряжение: <b>{voltage.value} В</b></div>
                    <div>Сила тока: <b>{getCurrent(voltage.value, power.value)} А</b></div>
                    <div>Мощность: <b>{power.value / 1000} Вт</b></div>
                </div>
            ) : (
                <div className='card' style={{height: 100}}>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                </div>
            )}
        </Grid.Column>
    )
}

export default Voltage