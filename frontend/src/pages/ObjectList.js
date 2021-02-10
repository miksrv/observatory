import React, { Component } from 'react'
import { connect } from 'react-redux'


import MainContainer from "../components/MainContainer";
import moment from "moment";
import FullTable from "../layouts/FullTable";
import {Container} from "semantic-ui-react";

import * as astroActions from '../store/astro/actions'

import _ from 'lodash'

class ObjectList extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(astroActions.getFITStat())
    }

    updateData = () => {}

    render() {
        const { FITStat } = this.props

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    { ! _.isEmpty(FITStat) && (
                        <FullTable
                            data={FITStat}
                        />
                    )}
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        FITStat: state.astro.FITStat,
    }
}

export default connect(mapStateToProps)(ObjectList)