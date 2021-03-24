import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader } from 'semantic-ui-react'

import FullTable from '../layouts/FullTable'
import MainContainer from '../components/MainContainer'

import moment from 'moment'

import _ from 'lodash'

class ObjectList extends Component {

    componentDidMount() {}

    updateData = () => {}

    render() {
        const { storePhotoStatistic, storePhotoList } = this.props

        return (
            <MainContainer
                title='Список объектов'
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card table-loader'>
                    { ! _.isEmpty(storePhotoStatistic) && ! _.isEmpty(storePhotoList) ? (
                        <FullTable
                            data={storePhotoStatistic}
                            photo={storePhotoList}
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
        storePhotoList: state.photo.dataList
    }
}

export default connect(mapStateToProps)(ObjectList)