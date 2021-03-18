import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import PhotoGrid from '../layouts/PhotoGrid'

class PhotoList extends Component {
    updateData = () => {}

    render() {
        const { storePhotoList } = this.props

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <PhotoGrid
                        photos={storePhotoList}
                        props={this.props}
                        full={true}
                    />
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        storePhotoList: state.photo.dataList
    }
}

export default connect(mapStateToProps)(PhotoList)