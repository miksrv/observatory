import React, { useState } from 'react'
import { TNewsPhotos } from '../../app/types'

import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'

type TNewsPhotosProps = {
    photos: TNewsPhotos[]
}

const NewsPhotos: React.FC<TNewsPhotosProps> = (props) => {
    const { photos: galleryPhotos } = props
    const [ showLightbox , setShowLightbox ] = useState<boolean>(false)
    const [ photoIndex , setCurrentIndex ] = useState<number>(0)

    const galleryList = galleryPhotos.map((item) => {
        return {
            src: item.thumb.src,
            width: item.thumb.width,
            height: item.thumb.height
        }
    })

    const getPhotoSrc = (index: number) => galleryPhotos[index].full.src

    return (
        <div className='photos'>
            <Gallery
                photos={galleryList}
                onClick={(event, photos) => {
                    setCurrentIndex(photos.index)
                    setShowLightbox(true)
                }}
            />
            {showLightbox &&
                <Lightbox
                    mainSrc={getPhotoSrc(photoIndex)}
                    nextSrc={getPhotoSrc((photoIndex + 1) % galleryPhotos.length)}
                    prevSrc={getPhotoSrc((photoIndex + galleryPhotos.length - 1) % galleryPhotos.length)}
                    onCloseRequest={() => setShowLightbox(false)}
                    onMovePrevRequest={() =>
                        setCurrentIndex((photoIndex + galleryPhotos.length - 1) % galleryPhotos.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((photoIndex + 1) % galleryPhotos.length)
                    }
                />
            }
        </div>
    )
}

export default NewsPhotos