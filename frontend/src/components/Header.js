import React, { Component } from 'react'
import { Checkbox, Container, Icon } from 'semantic-ui-react'

import moment from 'moment'

import timeAgo from '../data/functions'

class Header extends Component {

    state = {
        intervalId: null,
        autoUpdate: false,
        tickTock: null,
        lastUpdate: '---'
    }

    componentDidMount() {
        const autoUpdate = localStorage.getItem('autoUpdate') === 'true'

        moment.locale('ru')

        this.setState({ autoUpdate: autoUpdate })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { autoUpdate, lastUpdate } = this.state
        const { updateTime } = this.props

        if (updateTime !== lastUpdate) {
            this.setState({ lastUpdate: updateTime })
        }

        if (autoUpdate !== prevState.autoUpdate) {
            localStorage.setItem('autoUpdate', autoUpdate)

            this.timerControl()
        }
    }

    componentWillUnmount() {
        const { intervalId, tickTock } = this.state

        clearInterval(intervalId)
        clearInterval(tickTock)
    }

    timerControl = () => {
        const { autoUpdate, intervalId, tickTock } = this.state
        const { onUpdateData } = this.props

        if (autoUpdate) {
            const intervalId = setInterval(() => {
                onUpdateData()
            }, 30000)

            const tickTock = setInterval(() => {
                this.tickClock()
            }, 1000)

            this.setState({
                intervalId: intervalId,
                tickTock: tickTock
            })
        } else {
            clearInterval(intervalId)
            clearInterval(tickTock)
        }
    }

    tickClock = () => {
        const { updateTime } = this.props

        this.setState({
            lastUpdate: moment.unix(updateTime).fromNow()
        })
    }

    handleChangeAutoupdate = () => {
        this.setState(({ autoUpdate }) => ({ autoUpdate: !autoUpdate }))
    }

    render() {
        const { autoUpdate, lastUpdate } = this.state
        const { onClickMenu } = this.props

        let last_update = moment().unix() - lastUpdate

        return (
            <Container className='header-toolbar'>
                <Icon
                    className='hamburger'
                    name='bars'
                    size='big'
                    onClick={() => onClickMenu()}
                />
                <span className='last-update'>
                    <span className={((last_update > -180 && last_update < 180) ? 'online' : 'offline') + (autoUpdate ? ' pulsate' : '')}></span>
                    26.11.2020 20:03:04 {timeAgo(last_update)}
                </span>
                <Checkbox
                    toggle
                    checked={autoUpdate}
                    label=''
                    onChange={this.handleChangeAutoupdate}
                    className='update-switch'
                />
                <Icon
                    className='update-icon'
                    name='refresh'
                    size='large'
                    disabled={!autoUpdate}
                />
            </Container>
        )
    }
}

export default Header