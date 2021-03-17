import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import PhotoGrid from '../layouts/PhotoGrid'

import PHOTOS from '../data/_temp_PHOTOS'

class PhotoList extends Component {
    updateData = () => {}

    render() {
        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <PhotoGrid
                        photos={PHOTOS}
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

    }
}

export default connect(mapStateToProps)(PhotoList)