import React from 'react'
import { Image, Reveal, Dimmer, Loader } from 'semantic-ui-react'
import lang from '../locale/detect'

import _ from 'lodash'

const PhotoGrid = params => {
    const clickHandler = (object, date) => {
        params.props.history.push(`/photo/${object}?date=${date}`)
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
                <div key={key} className='item' onClick={() => clickHandler(item.object, item.date)}>
                    <Reveal animated='small fade'>
                        <Reveal.Content visible>
                            <Image src={process.env.REACT_APP_PHOTOS + item.file + '_thumb.jpg'} />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <div className='info'>
                                <h4>{item.title}</h4>
                                <p>{sliceText(item.text)}</p>
                            </div>
                        </Reveal.Content>
                    </Reveal>
                </div>
            ))}
        </div>
        ) : (
            <div className='photos-list card loader'>
                <Dimmer active>
                    <Loader>{lang.general.loading}</Loader>
                </Dimmer>
            </div>
        )
    )
}

export default PhotoGrid