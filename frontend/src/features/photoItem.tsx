import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPhotoListItemQuery, useGetCatalogItemQuery } from '../app/observatoryApi'

import PhotoItemHeader from '../components/photoItemHeader'
import PhotoTable from '../components/photoTable'

type TParamsURL = {
    name: string
}

const PhotoItem: React.FC = () => {
    const params: TParamsURL = useParams()
    const date = new URLSearchParams(window.location.search).get('date')

    const { data: dataPhotos, isLoading: photosLoading } = useGetPhotoListItemQuery(params.name)
    const { data: dataCatalog, isLoading: catalogLoading } = useGetCatalogItemQuery(params.name)

    if (dataPhotos?.status === false) {
        return <div>Что-то пошло не так, такого объекта нет</div>
    }

    const searchPhoto = (dataPhotos?.payload && date) && dataPhotos?.payload.filter((photo) => photo.date === date)
    const currentPhoto = searchPhoto && searchPhoto.length ? searchPhoto.pop() : dataPhotos?.payload?.[0]

    return (
        <>
            <PhotoItemHeader
                loader={photosLoading || catalogLoading}
                photo={currentPhoto}
                catalog={dataCatalog?.payload}
            />
            {dataPhotos?.payload && <PhotoTable photos={dataPhotos?.payload} />}
        </>
    )
}

export default PhotoItem
