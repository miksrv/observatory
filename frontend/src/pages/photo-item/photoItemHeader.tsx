import moment from 'moment'
import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { Link } from 'react-router-dom'
import { Button, Dimmer, Grid, Image, Loader } from 'semantic-ui-react'

import { TCatalog, TPhoto, TPhotoAuthor } from 'app/types'

import { getTimeFromSec } from 'functions/helpers'

import FilterList from 'components/filter-list/FilterList'
import SkyMap from 'components/sky-map/SkyMap'

import defaultPhoto from './images/default-photo.png'
import './styles.sass'

type TPhotoItemHeaderProps = {
    loader: boolean
    photo: TPhoto | undefined
    catalog: TCatalog | null | undefined
}

const Author = (data: TPhotoAuthor) =>
    data.link ? (
        <a
            href={data.link}
            title={data.name}
            target='_blank'
            rel='noreferrer'
        >
            {data.name}
        </a>
    ) : (
        data.name
    )

const PhotoItemHeader: React.FC<TPhotoItemHeaderProps> = (props) => {
    const { loader, photo, catalog } = props
    const [showLightbox, setShowLightbox] = useState<boolean>(false)
    const [photoLightbox, setPhotoLightbox] = useState<string>('')

    const name =
        !loader &&
        (catalog
            ? catalog.title
                ? catalog.title
                : catalog.name
            : photo?.object)
    const photoDate =
        !loader && photo ? moment.utc(photo.date).format('D.MM.Y') : '---'
    const category =
        !loader &&
        (catalog ? (catalog.category ? catalog.category : '---') : '---')
    const frames = !loader && photo ? photo.parameters?.frames : '---'
    const exposure =
        !loader && photo?.parameters
            ? getTimeFromSec(photo.parameters?.exposure, true)
            : '---'
    const filesize =
        !loader && photo?.parameters
            ? Math.round((photo?.parameters.filesizes / 1024) * 100) / 100
            : '---'

    return (
        <div className='box photo-item-header'>
            {loader && (
                <Dimmer active>
                    <Loader>Загрузка</Loader>
                </Dimmer>
            )}
            <Grid>
                <Grid.Column
                    computer={9}
                    tablet={8}
                    mobile={16}
                    className='photo-container'
                >
                    <Image
                        className='photo'
                        src={
                            photo
                                ? `${process.env.REACT_APP_API_HOST}public/photo/${photo.file}_thumb.${photo.ext}`
                                : defaultPhoto
                        }
                        onClick={() => {
                            if (photo) {
                                setPhotoLightbox(`${photo.file}.${photo.ext}`)
                                setShowLightbox(true)
                            }
                        }}
                    />
                </Grid.Column>
                <Grid.Column
                    computer={7}
                    tablet={8}
                    mobile={16}
                    className='description'
                >
                    <div>
                        <h1>
                            {name}
                            <Button
                                size='mini'
                                icon='download'
                                color='green'
                                className='download'
                                href={
                                    `${process.env.REACT_APP_API_HOST}get/photo/download` +
                                    `?object=${photo?.object}&date=${photo?.date}`
                                }
                            />
                        </h1>
                        <Grid className='describe'>
                            <Grid.Column
                                computer={7}
                                tablet={7}
                                mobile={16}
                            >
                                <div>
                                    <span className='second-color'>
                                        Дата обработки:
                                    </span>{' '}
                                    {photoDate}
                                </div>
                                <div>
                                    <span className='second-color'>
                                        Экспозиция:
                                    </span>{' '}
                                    {exposure}
                                </div>
                                <div>
                                    <span className='second-color'>
                                        Кадров:
                                    </span>{' '}
                                    {frames}
                                    {photo?.parameters && (
                                        <span className='second-color'>
                                            {' '}
                                            (
                                            <Link
                                                to={`/object/${photo?.object}`}
                                            >
                                                список
                                            </Link>
                                            )
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className='second-color'>
                                        Накоплено данных:
                                    </span>{' '}
                                    {filesize} Гб
                                </div>
                                <div>
                                    <span className='second-color'>
                                        Категория:
                                    </span>{' '}
                                    {category}
                                </div>
                                {photo?.author && (
                                    <div>
                                        <span className='second-color'>
                                            Обработка:
                                        </span>{' '}
                                        {Author(photo.author)}
                                    </div>
                                )}
                            </Grid.Column>
                            <Grid.Column
                                computer={9}
                                tablet={9}
                                mobile={16}
                            >
                                {!loader && photo?.parameters?.filters && (
                                    <FilterList
                                        filters={photo.parameters?.filters}
                                    />
                                )}
                            </Grid.Column>
                        </Grid>
                    </div>
                    <div className='text'>{catalog?.text}</div>
                    <div className='object-map'>
                        <SkyMap
                            objects={
                                catalog && photo
                                    ? [
                                          {
                                              dec: catalog.dec,
                                              name: photo.object,
                                              ra: catalog.ra
                                          }
                                      ]
                                    : undefined
                            }
                        />
                    </div>
                </Grid.Column>
            </Grid>
            {showLightbox && (
                <Lightbox
                    mainSrc={`${process.env.REACT_APP_API_HOST}public/photo/${photoLightbox}`}
                    onCloseRequest={() => setShowLightbox(false)}
                />
            )}
        </div>
    )
}

export default PhotoItemHeader
