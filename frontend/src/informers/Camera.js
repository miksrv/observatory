import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const Camera = ( ) => {
    const [ isOpen, setImagebox ] = useState(false);

    let camera = 'https://fits.miksoft.pro/get/webcam_photo'

    return (
        <Grid>
            <Grid.Column computer={6} tablet={16} mobile={16}>
                <div className='informer container'>
                    {isOpen && (
                        <Lightbox
                            mainSrc={camera}
                            onCloseRequest={() => setImagebox(false)}
                        />
                    )}
                    <img onClick={() => setImagebox(true)} src={camera} alt='' />
                </div>
            </Grid.Column>
        </Grid>
    )
}

export default Camera