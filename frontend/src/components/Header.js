import React, { Component } from 'react'
import { Checkbox, Container, Icon } from 'semantic-ui-react'

import moment from 'moment'

class Header extends Component {

    state = {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        const { onClickMenu } = this.props

        return (
            <Container className='header-toolbar'>
                <Icon
                    className='hamburger'
                    name='bars'
                    size='big'
                    onClick={() => onClickMenu()}
                />
                <span className='last-update'>

                </span>
                <Checkbox
                    toggle
                    // checked={autoUpdate}
                    label=''
                    // onChange={this.handleChangeAutoupdate}
                    className='update-switch'
                />
            </Container>
        )
    }
}

export default Header