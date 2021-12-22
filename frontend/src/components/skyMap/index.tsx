import React from 'react'

import RenderMap from './renderMap'

type TSkyMapProps = {
    objects: TObject[] | undefined
    interactive?: boolean
}

type TObject = {
    ra: number
    dec: number
    name: string
}

const createObjectsJSON = (objects: TObject[]) => {
    const JSON: any = {
        type: 'FeatureCollection',
        features: []
    }

    objects.map((item) => {
        const objectName = item.name.replace(/_/g, ' ')
        const objectJSON = {
            type: 'Feature',
            id: objectName,
            properties: {
                name: objectName,
                mag: 10,
                dim: 30
            },
            geometry: {
                type: 'Point',
                coordinates: [item.ra, item.dec]
            }
        }

        return JSON.features.push(objectJSON)
    })

    return JSON
}

const SkyMap: React.FC<TSkyMapProps> = (props) => {
    const { objects, interactive } = props
    const config = {
        interactive: interactive ?? false
    }

    return (
        <>
            {(objects === undefined || !objects.length) ?
                <div>Загрузка...</div>
                :
                <RenderMap geoJSON={createObjectsJSON(objects)} config={config} />
            }
        </>
    )
}

export default SkyMap