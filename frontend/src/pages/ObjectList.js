import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as astroActions from '../store/astro/actions'

class ObjectList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
    }

    render() {
        return (
            <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        objectData: state.astro.objectData
    }
}

export default connect(mapStateToProps)(ObjectList)