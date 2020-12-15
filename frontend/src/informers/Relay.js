import React from 'react'
import { Grid, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react'

const Relay = (props) => {
    const { data, state, auth, index } = props

    const handleSwitch = (index) => {
        props.handleSwitch(index)
    }

    const checked = (state !== false && state !== 0)

    return (
        <Grid.Column>
            <div className={'relay ' + (checked ? 'switch-on' : 'switch-off')}>
                {
                    (state === false || data.loader) && (
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
                                checked={checked && true || false}
                                className='checkbox'
                                disabled={!auth}
                                onChange={() => handleSwitch(index)}
                            />
                            <div className='title'><span className='state'></span>{data.name}</div>
                            <div className='desc'>{data.description}</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Grid.Column>
    )
}

export default Relay