import React, { useMemo, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import Gallery from 'react-photo-gallery'

import { TNewsPhotos } from 'app/types'

type TNewsPhotosProps = {
    photos: TNewsPhotos[]
}

const NewsPhotos: React.FC<TNewsPhotosProps> = (props) => {
    const { photos: galleryPhotos } = props
    const [showLightbox, setShowLightbox] = useState<boolean>(false)
    const [photoIndex, setCurrentIndex] = useState<number>(0)

    const listGallery = useMemo(() => {
        return galleryPhotos.length
            ? galleryPhotos.map((item) => ({
                  height: item.thumb.height,
                  src: item.thumb.src,
                  width: item.thumb.width
              }))
            : []
    }, [galleryPhotos])

    const getPhotoSrc = (index: number) => galleryPhotos[index].full.src

    return (
        <div className='photos'>
            <Gallery
                photos={listGallery}
                onClick={(event, photos) => {
                    setCurrentIndex(photos.index)
                    setShowLightbox(true)
                }}
            />
            {showLightbox && (
                <Lightbox
                    mainSrc={getPhotoSrc(photoIndex)}
                    nextSrc={getPhotoSrc(
                        (photoIndex + 1) % galleryPhotos.length
                    )}
                    prevSrc={getPhotoSrc(
                        (photoIndex + galleryPhotos.length - 1) %
                            galleryPhotos.length
                    )}
                    onCloseRequest={() => setShowLightbox(false)}
                    onMovePrevRequest={() =>
                        setCurrentIndex(
                            (photoIndex + galleryPhotos.length - 1) %
                                galleryPhotos.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((photoIndex + 1) % galleryPhotos.length)
                    }
                />
            )}
        </div>
    )
}

export default NewsPhotos
