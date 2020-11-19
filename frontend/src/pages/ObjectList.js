import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as observatoryActions from '../store/observatory/actions'

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
        objectData: state.observatory.objectData
    }
}

export default connect(mapStateToProps)(ObjectList)