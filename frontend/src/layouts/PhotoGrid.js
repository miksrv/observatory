import React from 'react'
import { Image, Reveal, Dimmer, Loader } from 'semantic-ui-react'

import _ from 'lodash'

const PHOTO_URL = 'https://api.miksoft.pro/photo/'

const PhotoGrid = params => {
    const clickHandler = object => {
        params.props.history.push('/photo/' + object)
    }

    const sliceText = text => {
        let sliced = text.slice(0, 250)

        if (sliced.length < text.length) sliced += '...'

        return sliced
    }

    return (
        ! _.isEmpty(params.photos) ? (
        <div className={'photos-list card' + (params.full ? ' full' : '')}>
            {params.photos.map((item, key) => (
                <div key={key} className='item' onClick={() => clickHandler(item.photo_obj)}>
                    <Reveal animated='small fade'>
                        <Reveal.Content visible>
                            <Image src={PHOTO_URL + item.photo_obj + '_thumb.jpg'} />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <div className='info'>
                                <h4>{item.photo_title}</h4>
                                <p>{sliceText(item.photo_text)}</p>
                            </div>
                        </Reveal.Content>
                    </Reveal>
                </div>
            ))}
        </div>
        ) : (
            <div className='photos-list card loader'>
                <Dimmer active>
                    <Loader>Загрузка</Loader>
                </Dimmer>
            </div>
        )
    )
}

export default PhotoGrid