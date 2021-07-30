import React from 'react'
import { Dimmer, Loader, Button } from 'semantic-ui-react'

import relayList from '../data/relay'

/**
 * Device control power switches component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Relay = props => {
    const { store, disabled, auth } = props

    return (
        <div className='card padding devices-control'>
            {(store === false) && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            {relayList.map((item, index) => {
                let status = store ? store[index][index] : false;

                return (
                    <div className={'item switch-' + (status ? 'on' : 'off')} key={index}>
                        <div className='name'>{item.name}</div>
                        <div className='switch'>
                            <Button
                                disabled={(disabled || ! auth)}
                                onClick={() => props.handleSwitch(index, status)}
                                size='tiny'
                            >{status ? 'On' : 'Off'}</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Relay