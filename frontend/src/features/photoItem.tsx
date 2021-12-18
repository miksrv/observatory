import React from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetPhotoListItemQuery, useGetCatalogItemQuery, useGetPhotoListQuery
} from '../app/observatoryApi'

import PhotoItemHeader from '../components/photoItemHeader'
import PhotoTable from '../components/photoTable'
import ObjectCloud from '../components/objectCloud'

type TParamsURL = {
    name: string
}

const PhotoItem: React.FC = () => {
    const params: TParamsURL = useParams()
    const date = new URLSearchParams(window.location.search).get('date')

    const { data: dataPhotos, isFetching: photosLoading } = useGetPhotoListItemQuery(params.name)
    const { data: dataCatalog, isLoading: catalogLoading } = useGetCatalogItemQuery(params.name)
    const { data: photosList, isLoading: photosListLoading } = useGetPhotoListQuery()

    if (dataPhotos?.status === false) {
        return <div>Что-то пошло не так, такого объекта нет</div>
    }

    const searchPhoto = (dataPhotos?.payload && date) && dataPhotos?.payload.filter((photo) => photo.date === date)
    const currentPhoto = searchPhoto && searchPhoto.length ? searchPhoto.pop() : dataPhotos?.payload?.[0]

    const photosNames: string[] = []

    photosList?.payload && photosList?.payload.map((item) =>
        !photosNames.includes(item.object) && photosNames.push(item.object)
    )

    return (
        <>
            <PhotoItemHeader
                loader={photosLoading || catalogLoading}
                photo={currentPhoto}
                catalog={dataCatalog?.payload}
            />
            {dataPhotos?.payload && <><br /><PhotoTable photos={dataPhotos?.payload} /></>}
            <br />
            <ObjectCloud
                loader={photosListLoading}
                current={params.name}
                names={photosNames}
                link='photo'
            />
        </>
    )
}

export default PhotoItem
