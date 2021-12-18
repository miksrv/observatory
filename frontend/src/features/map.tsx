import React from 'react'
import { useGetCatalogListQuery } from '../app/observatoryApi'
import { TCatalog } from '../app/types'
import SkyMap from '../components/skyMap'

const Map: React.FC = () => {
    const { data, isSuccess } = useGetCatalogListQuery()
    const objectsList: any = (isSuccess && data?.payload) && data.payload
        .filter((item: TCatalog) => item.ra !== 0 && item.dec !== 0)
        .map((item: TCatalog) => {
            return {
                ra: item.ra,
                dec: item.dec,
                name: item.name
            }
        })

    return (
        <div className='box table'>
            <SkyMap
                objects={objectsList}
            />
        </div>
    )
}

export default Map
