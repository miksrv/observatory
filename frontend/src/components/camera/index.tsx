import React, { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { Dimmer, Message, Progress } from 'semantic-ui-react'

import './styles.sass'

type TCameraProps = {
    cameraURL: string
}

const CAMERA_INTERVAL = 15

const Camera: React.FC<TCameraProps> = (props) => {
    const { cameraURL } = props

    const [ cameraSrc, setCameraSrc ] = useState<string>(cameraURL)
    const [ seconds, setSeconds ] = useState<number>(0)
    const [ lightbox, setLightbox ] = useState<boolean>(false)

    useEffect(() => {
        if (cameraURL) {
            const interval = setInterval(() => {
                if (seconds < CAMERA_INTERVAL) {
                    setSeconds(seconds => seconds + 1)
                } else {
                    setCameraSrc(cameraURL + '?r=' + Math.random())
                    setSeconds(0)
                }
            }, 1000)

            return () => clearInterval(interval)
        }
    })

    return (
        <div className='box camera'>
            {cameraURL && lightbox && (
                <Lightbox
                    mainSrc={cameraSrc}
                    onCloseRequest={() => setLightbox(false)}
                />
            )}
            {cameraURL ?
                <>
                    <img onClick={() => setLightbox(true)} src={cameraSrc} alt='' />
                    <Progress percent={Math.round((seconds / CAMERA_INTERVAL) * 100)} success size='tiny' />
                </>
                :
                <Dimmer active>
                    <Message
                        error
                        icon='photo'
                        header='Камера не доступна'
                        content='Изображение камеры не доступно'
                    />
                </Dimmer>
            }
        </div>
    )
}

export default Camera