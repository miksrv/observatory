import React, { useState } from 'react'
import { useGetCatalogListQuery } from '../app/observatoryApi'
import { TCatalog } from '../app/types'

import SkyMap from '../components/skyMap'
import ObjectCloudMap from '../components/skyMap/objectCloudMap'

const Map: React.FC = () => {
    const { data, isSuccess } = useGetCatalogListQuery()
    const [ goToObject, setGoToObject ] = useState<[number, number]>([0, 0])
    const objectsList: any = (isSuccess && data?.payload) && data.payload
        .filter((item: TCatalog) => item.ra !== 0 && item.dec !== 0)
        .map((item: TCatalog) => {
            return {
                ra: item.ra,
                dec: item.dec,
                name: item.name
            }
        })

    document.title = 'Астрономическая карта - Обсерватория'

    return (
        <>
            <div className='box table global-map'>
                <SkyMap
                    objects={objectsList}
                    interactive={true}
                    goto={goToObject}
                />
            </div>
            <br />
            <ObjectCloudMap
                loader={!objectsList}
                objects={objectsList}
                handleClick={(ra, dec) => setGoToObject([ra, dec])}
            />
        </>
    )
}

export default Map
