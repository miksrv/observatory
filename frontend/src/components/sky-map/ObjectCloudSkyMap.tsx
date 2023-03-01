import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

import { TObject } from './types'

type TObjectCloudProps = {
    loader: boolean
    objects: TObject[]
    handleClick?: (ra: number, dec: number) => void
}

const ObjectCloudSkyMap: React.FC<TObjectCloudProps> = (props) => {
    const { loader, objects, handleClick } = props

    return (
        <div className='box object-cloud-map'>
            {loader ? (
                <>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                    <div>Загрузка...</div>
                </>
            ) : (
                objects.map((item, key) => (
                    <span
                        className='item'
                        role='button'
                        tabIndex={0}
                        onKeyDown={() => {}}
                        onClick={() => handleClick?.(item.ra, item.dec)}
                        key={key}
                    >
                        {item.name.replace(/_/g, ' ')}
                    </span>
                ))
            )}
        </div>
    )
}

export default ObjectCloudSkyMap
