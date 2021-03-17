import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Image, Grid } from 'semantic-ui-react'
import Lightbox from 'react-image-lightbox'

import moment from 'moment'

import MainContainer from '../components/MainContainer'
import PhotoGrid from '../layouts/PhotoGrid'

import PHOTOS from '../data/_temp_PHOTOS'

class PhotoItem extends Component {
    state = {
        photoIndex: 0,
        isOpen: false
    }

    updateData = () => {}

    clickHandler = photo => {
        this.setState({isOpen: true, photoIndex: photo})
    }

    render() {
        const { photoIndex, isOpen } = this.state

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <div className='card photo-info'>
                        <Grid>
                            <Grid.Column computer={9} tablet={8} mobile={16}>
                                <Image src='https://observatory.miksoft.pro/img/3.jpg' onClick={() => this.clickHandler('https://observatory.miksoft.pro/img/3.jpg')} />
                            </Grid.Column>
                            <Grid.Column computer={7} tablet={8} mobile={16}>
                                <h3>NGC 6946 Галактика "Фейрверк"</h3>
                                <div>Дата обработки: 27 февраля 2021 года</div>
                                <div>Общая выдержка: 5 часов 17 минут</div>
                                <div>Количество кадров: 87</div>
                                <ul>
                                    <li>Luminance: 23 кадра, 121 мин</li>
                                    <li>Red: 10 кадров, 20 мин</li>
                                    <li>Green: 10 кадров, 20 мин</li>
                                    <li>Blue: 30 кадров, 20 мин</li>
                                </ul>
                                <div>
                                    <p>NGC 6946 (галактика "Фейерверк") - спиральная галактика с перемычкой, которая находится на расстоянии ~ 22 млн св лет в созвездии Лебедь. Диаметр галактики составляет около 40 тыс. св. лет в поперечнике (наша галактика ~ 100 тыс. св. лет). NGC 6946 богата газопылевыми облаками, в которых происходит интенсивное звездообразование: с 1917 по 2008 г. в ней зарегистрировано девять вспышек сверхновых звезд, это рекордное количество таких вспышек, наблюдавшихся в какой-либо галактике. В 2017 мы целый год наблюдали за вспышкой SN2017eaw в этой галактике.</p>
                                    <p>Свое прозвище "Фейерверк" галактика получила, однако, не из-за частых вспышек сверхновых, а за обилие ярких областей ионизированного водорода HII (красный цвет на фото - водород). Это указывает на многочисленность в NGC 6946 массивных звезд (по массе превышающих восемь солнечных), которые способны не только взрываться, как сверхновые, но и ионизировать своим излучением соседние водородные облака.</p>
                                </div>
                                <div><Link to='/photo/'>Вернуться к списку всех фотографий</Link></div>
                            </Grid.Column>
                        </Grid>
                    </div>
                    <PhotoGrid
                        photos={PHOTOS.slice(0, 4)}
                        props={this.props}
                    />
                    {isOpen && (
                        <Lightbox
                            mainSrc={photoIndex}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </Container>
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(PhotoItem)