import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'

const PhotoGrid = params => {
    const clickHandler = object => {
        params.props.history.push('/photo/' + object)
    }

    return (
        <div className={'photos-list card' + (params.full ? ' full' : '')}>
            {params.photos.map((item, key) => (
                <div key={key} className='item' onClick={() => clickHandler(item.object)}>
                    <Reveal animated='small fade'>
                        <Reveal.Content visible>
                            <Image src={item.src} />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <div className='info'>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </Reveal.Content>
                    </Reveal>
                </div>
            ))}
        </div>
    )
}

export default PhotoGrid