import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

import {
    useGetCatalogItemQuery,
    useGetPhotoListItemQuery,
    useGetPhotoListQuery
} from 'app/observatoryApi'

import ObjectCloud from 'components/object-cloud/ObjectCloud'
import PhotoTable from 'components/photo-table/PhotoTable'

import PhotoItemHeader from './photoItemHeader'

const PhotoItem: React.FC = () => {
    const params: { name: string } = useParams()
    const date = new URLSearchParams(window.location.search).get('date')

    const { data: dataPhotos, isFetching: photosLoading } =
        useGetPhotoListItemQuery(params.name)
    const { data: dataCatalog, isLoading: catalogLoading } =
        useGetCatalogItemQuery(params.name)
    const { data: photosList, isLoading: photosListLoading } =
        useGetPhotoListQuery()

    const currentPhoto = useMemo(() => {
        const searchPhoto =
            dataPhotos?.payload &&
            date &&
            dataPhotos?.payload.filter((photo) => photo.date === date)
        return searchPhoto && searchPhoto.length
            ? searchPhoto.pop()
            : dataPhotos?.payload?.[0]
    }, [dataPhotos, date])

    const listPhotoNames = useMemo(() => {
        return photosList?.payload.length
            ? photosList.payload
                  .map((item) => item.object)
                  .filter(
                      (item, index, self) =>
                          item !== '' && self.indexOf(item) === index
                  )
            : []
    }, [photosList])

    useEffect(() => {
        document.title = `${
            dataCatalog?.payload ? dataCatalog.payload.title : ''
        } Фото - Обсерватория`
    }, [dataCatalog])

    return !dataPhotos?.status && !photosLoading ? (
        <Message
            error
            content='Что-то пошло не так, такого объекта нет. Возможно не верный адрес ссылки?'
        />
    ) : (
        <>
            <PhotoItemHeader
                loader={photosLoading || catalogLoading}
                photo={currentPhoto}
                catalog={dataCatalog?.payload}
            />
            {dataPhotos?.payload && (
                <>
                    <br />
                    <PhotoTable photos={dataPhotos?.payload} />
                </>
            )}
            <br />
            <ObjectCloud
                loader={photosListLoading}
                current={params.name}
                names={listPhotoNames}
                link='photo'
            />
        </>
    )
}

export default PhotoItem