import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Reveal, Dimmer, Loader } from 'semantic-ui-react'
import { TPhoto, TCatalog } from '../../app/types'

type TPhotoGridProps = {
    loading: boolean
    photoList: any
    loaderCount?: number
    className?: string
}

const PhotosLoader = (count: number) => {
    return Array(count).fill(1).map((item, key) =>
        <div key={key} className='item'>
            <div className='info'>
                <Dimmer active>
                    <Loader />
                </Dimmer>
            </div>
        </div>
    )
}

const PhotoGrid: React.FC<TPhotoGridProps> = (props) => {
    const { loading, photoList, loaderCount, className } = props

    const sliceText = (text: string) => {
        let sliced = text.slice(0, 350)

        return sliced + (sliced.length < text.length && '...')
    }

    return <div className={`box photo-gird ${className ? className : ''}`}>
        {
            loading ?
                PhotosLoader(loaderCount ? loaderCount : 12)
                :
                photoList.map((photo: TPhoto & TCatalog, key: number) =>
                    <Link to={`/photo/${photo.object}?date=${photo.date}`} key={key} className='item'>
                        {photo.title ?
                            <Reveal animated='small fade'>
                                <Reveal.Content visible>
                                    <Image src={`https://api.miksoft.pro/public/photo/${photo.file}_thumb.${photo.ext}`} className='photo' />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                    <div className='info'>
                                        <h4>{photo.title}</h4>
                                        <p>{photo.text && sliceText(photo.text)}</p>
                                    </div>
                                </Reveal.Content>
                            </Reveal>
                        :
                            <Image src={`https://api.miksoft.pro/public/photo/${photo.file}_thumb.${photo.ext}`} className='photo' />
                        }
                    </Link>
                )
        }
    </div>
}

export default PhotoGrid