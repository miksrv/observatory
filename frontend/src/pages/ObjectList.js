import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader } from 'semantic-ui-react'

import FullTable from '../layouts/FullTable'
import MainContainer from '../components/MainContainer'

import * as astroActions from '../store/astro/actions'

import moment from 'moment'
import _ from 'lodash'

class ObjectList extends Component {

    componentDidMount() {
        const { dispatch, storePhotoStatistic } = this.props

        _.isEmpty(storePhotoStatistic) && dispatch(astroActions.getFITStat())
    }

    updateData = () => {}

    render() {
        const { storePhotoStatistic } = this.props

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card table-loader'>
                    { ! _.isEmpty(storePhotoStatistic) ? (
                        <FullTable
                            data={storePhotoStatistic}
                        />
                    ) : (
                        <Dimmer active>
                            <Loader>Загрузка</Loader>
                        </Dimmer>
                    )}
                    </div>
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        storePhotoStatistic: state.astro.FITStat,
    }
}

export default connect(mapStateToProps)(ObjectList)