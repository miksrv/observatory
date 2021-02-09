import React, { useState, useEffect } from 'react'
import { Progress } from 'semantic-ui-react'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const cameraURL = 'https://api.miksoft.pro/astro/get/webcam'

const Camera = ( ) => {
    const [ cameraSRC, setImage ] = useState(cameraURL);
    const [ seconds, setSeconds ] = useState(0);
    const [ isOpen, setImagebox ] = useState(false);

    useEffect(() => {
        let interval = null

        interval = setInterval(() => {
            if (seconds < 100) {
                setSeconds(seconds => seconds + 1)
            } else {
                setImage(cameraURL + '?r=' + Math.random())
                setSeconds(0)
            }
        }, 300)

        return () => clearInterval(interval)
    })

    return (
        <div className='informer cameraPhoto'>
            {isOpen && (
                <Lightbox
                    mainSrc={cameraSRC}
                    onCloseRequest={() => setImagebox(false)}
                />
            )}
            <img onClick={() => setImagebox(true)} src={cameraSRC} alt='' />
            <Progress percent={seconds} success size='tiny' />
        </div>
    )
}

export default Camera