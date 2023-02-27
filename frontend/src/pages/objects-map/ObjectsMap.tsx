import React, { useState, useEffect, useMemo } from 'react'
import { useGetCatalogListQuery } from 'app/observatoryApi'
import { TCatalog } from 'app/types'

import SkyMap from 'components/sky-map/SkyMap'
import ObjectCloudSkyMap from 'components/sky-map/ObjectCloudSkyMap'

const ObjectsMap: React.FC = () => {
    const { data, isSuccess } = useGetCatalogListQuery()
    const [ goToObject, setGoToObject ] = useState<[number, number]>([0, 0])

    const listObjects = useMemo(() => {
        return data?.payload.length
            ? data?.payload
                .filter((item: TCatalog) => item.ra !== 0 && item.dec !== 0)
                .map((item: TCatalog) => {
                    return {
                        ra: item.ra,
                        dec: item.dec,
                        name: item.name
                    }
                })
            : []
    }, [data])

    useEffect(() => {
        document.title = 'Астрономическая карта - Обсерватория'
    })

    return (
        <>
            <div className='box table global-map'>
                <SkyMap
                    objects={listObjects}
                    interactive={true}
                    goto={goToObject}
                />
            </div>
            <br />
            <ObjectCloudSkyMap
                loader={isSuccess && !listObjects?.length}
                objects={listObjects}
                handleClick={(ra, dec) => setGoToObject([ra, dec])}
            />
        </>
    )
}

export default ObjectsMap
