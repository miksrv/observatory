import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import PhotoGrid from '../layouts/PhotoGrid'

import _ from 'lodash'

const filterList = [
    'Туманности',
    'Галактики',
    'Скопления',
    'Сверхновые'
]

class PhotoList extends Component {
    state = {
        filterActive: null
    }

    updateData = () => {}

    handleFilterSelect = currentFilter => {
        const { filterActive } = this.state

        if (currentFilter !== filterActive) this.setState({filterActive: currentFilter})
    }

    render() {
        const { storePhotoList } = this.props
        const { filterActive } = this.state

        const filteredPhotos  = !_.isEmpty(storePhotoList) ? storePhotoList.photos.filter(({ category }) => {
            return ! this.state.filterActive || category === this.state.filterActive
        }) : null

        return (
            <MainContainer
                title='Список фотографий'
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    {!_.isEmpty(filteredPhotos) && (
                        <div className='filterToolbar'>
                            <Button
                                color={filterActive === null ? 'olive' : 'green'}
                                size='mini'
                                onClick={() => this.handleFilterSelect(null)}
                            >
                                Все объекты
                            </Button>
                            {filterList.map(filterName => (
                                <Button
                                    color={filterActive === filterName ? 'olive' : 'green'}
                                    size='mini'
                                    key={filterName}
                                    onClick={() => this.handleFilterSelect(filterName)}
                                >
                                    {filterName}
                                </Button>
                            ))}
                        </div>
                    )}
                    <PhotoGrid
                        photos={filteredPhotos}
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