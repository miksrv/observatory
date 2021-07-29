import React from 'react'
import { Grid, Icon, Checkbox, Dimmer, Loader } from 'semantic-ui-react'

const Relay_old = (props) => {
    const { data, state, auth, index, disabled } = props

    const handleSwitch = (index) => {
        props.handleSwitch(index)
    }

    const checked = (state !== false && state !== 0)

    return (
        <Grid.Column>
            <div className={'card relay ' + (checked ? 'switch-on' : 'switch-off')}>
                {
                    (state === false || data.loader) && (
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    )
                }
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Icon name='plug' className='control-icon' />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Checkbox
                                toggle
                                checked={checked ? true : false}
                                className='checkbox'
                                disabled={!auth || disabled}
                                onChange={() => handleSwitch(index)}
                            />
                            <div className='title'><span className='state'></span>{data.name}</div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Grid.Column>
    )
}

export default Relay_old