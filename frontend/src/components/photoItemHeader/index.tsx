import React, { useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Dimmer, Loader } from 'semantic-ui-react'
import { TPhoto, TCatalog } from '../../app/types'
import { getTimeFromSec } from '../../functions/helpers'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import FilterList from '../filterList'
import SkyMap from '../skyMap'
import defaultPhoto from './images/default-photo.png'

type TPhotoItemHeaderProps = {
    loader: boolean
    photo: TPhoto | undefined
    catalog: TCatalog | null | undefined
}

const PhotoItemHeader: React.FC<TPhotoItemHeaderProps> = (props) => {
    const { loader, photo, catalog } = props
    const [ showLightbox , setShowLightbox ] = useState<boolean>(false)
    const [ photoLightbox , setPhotoLightbox ] = useState<string>('')

    const name = ! loader && (catalog ? (catalog.title ? catalog.title : catalog.name) : photo?.object)
    const photoDate = ! loader && photo ? moment.utc(photo.date).format('D.MM.Y') : '---'
    const category = ! loader && (catalog ? (catalog.category ? catalog.category : '---') : '---')
    const frames = ! loader && photo ? photo.parameters?.frames : '---'
    const exposure = ! loader && photo?.parameters ? getTimeFromSec(photo.parameters?.exposure, true) : '---'
    const filesize = ! loader && photo?.parameters ? Math.round((photo?.parameters.filesizes / 1024) * 100) / 100 : '---'

    return (
        <div className='box photo-item-header'>
            {loader &&
                <Dimmer active>
                    <Loader>Загрузка</Loader>
                </Dimmer>
            }
            <Grid>
                <Grid.Column computer={9} tablet={8} mobile={16}>
                    <Image
                        className='photo'
                        src={(photo ? `https://api.miksoft.pro/public/photo/${photo.file}_thumb.${photo.ext}` : defaultPhoto)}
                        onClick={() => {
                            if (photo) {
                                setPhotoLightbox(`${photo.file}.${photo.ext}`)
                                setShowLightbox(true)
                            }
                        }}
                    />
                </Grid.Column>
                <Grid.Column computer={7} tablet={8} mobile={16} className='description'>
                    <div>
                        <h1>{name}</h1>
                        <Grid>
                            <Grid.Column computer={7} tablet={7} mobile={16}>
                                <div><span className='second-color'>Дата обработки:</span> {photoDate}</div>
                                <div><span className='second-color'>Экспозиция:</span> {exposure}</div>
                                <div><span className='second-color'>Кадров:</span> {frames}
                                    {photo?.parameters &&
                                        <span className='second-color'> (<Link to={`/object/${photo?.object}`}>список</Link>)</span>
                                    }
                                </div>
                                <div><span className='second-color'>Размер файлов:</span> {filesize} Гб</div>
                                <div><span className='second-color'>Категория:</span> {category}</div>
                            </Grid.Column>
                            <Grid.Column computer={9} tablet={9} mobile={16}>
                                {(! loader && photo?.parameters?.filters) && <FilterList filters={photo.parameters?.filters} />}
                            </Grid.Column>
                        </Grid>
                    </div>
                    <div className='text'>{catalog?.text}</div>
                    <div>
                        <SkyMap
                            ra={catalog?.ra}
                            dec={catalog?.dec}
                            name={photo?.object}
                        />
                    </div>
                    {/*<Link to='/photo/'><Button size='mini' icon='grid layout' color='blue' content='Фотографии' /></Link>*/}
                    {/*{(!_.isEmpty(storePhotoItem) && (*/}
                    {/*    <Button size='mini' icon='download' color='green' content='Скачать' href={`https://api.miksoft.pro/photo/get/download?name=${storePhotoItem.name}&date=${storePhotoItem.photo.date}`} />*/}
                    {/*))}*/}
                </Grid.Column>
            </Grid>
            {showLightbox &&
                <Lightbox
                    mainSrc={`https://api.miksoft.pro/public/photo/${photoLightbox}`}
                    onCloseRequest={() => setShowLightbox(false)}
                />
            }
        </div>
    )
}

export default PhotoItemHeader