import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class Object extends Component {

    componentDidMount() {

    }

    render() {
        const { name } = this.props.match.params

        return (
            <Container>
                {name}
            </Container>
        )
    }
}

export default Object