import React, { useState } from 'react'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const Camera = ( ) => {
    const [ isOpen, setImagebox ] = useState(false);

    let camera = 'https://fits.miksoft.pro/get/webcam_photo'

    return (
        <div className='informer cameraPhoto'>
            {isOpen && (
                <Lightbox
                    mainSrc={camera}
                    onCloseRequest={() => setImagebox(false)}
                />
            )}
            <img onClick={() => setImagebox(true)} src={camera} alt='' />
        </div>
    )
}

export default Camera