import React, { useRef, useEffect, useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { TObject } from './types'

import RenderMap from './RenderMap'

import './styles.sass'

type TSkyMapProps = {
    objects: TObject[] | undefined
    interactive?: boolean
    goto?: [number, number]

}

const SkyMap: React.FC<TSkyMapProps> = (props) => {
    const { objects, interactive, goto } = props
    const [ width, setWidth ] = useState<number>(0)

    const ref = useRef<HTMLDivElement>(null)
    const config = {
        interactive: interactive ?? false
    }

    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
    }, [ref])

    return (
        <div ref={ref}>
            {objects === undefined || !objects.length || width === 0 ?
                <div className='map-loader'>
                    <Dimmer active>
                        <Loader>Загрузка</Loader>
                    </Dimmer>
                </div>
                :
                <RenderMap
                    objects={objects}
                    config={config}
                    width={width}
                    goto={goto}
                />
            }
        </div>
    )
}

export default SkyMap
