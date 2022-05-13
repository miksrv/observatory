import React, { useState, useEffect, useCallback } from 'react'
import { Message } from 'semantic-ui-react'
import { useGetPhotoListQuery, useGetCatalogListQuery } from '../../app/observatoryApi'
import { TPhoto, TCatalog } from '../../app/types'

import PhotoCategorySwitcher from './PhotoCategorySwitcher'
import PhotoGrid from '../../components/photoGrid'

const PhotoList: React.FC = () => {
    const [ category, setCategory ] = useState('')
    const { data: photoData, isSuccess, isLoading, isError } = useGetPhotoListQuery()
    const { data: catalogData } = useGetCatalogListQuery()

    const doCategoriesList = useCallback(() => {
        return catalogData && catalogData.payload.length
            ? catalogData.payload
                .map((item) => item.category)
                .filter((item, index, self) => item !== '' && self.indexOf(item) === index)
            : []
    }, [catalogData])

    const doPhotosList: (TPhoto & TCatalog)[] | any = useCallback(() => {
        return photoData?.payload.length
            ? photoData?.payload.map((photo) => {
                const objectData = catalogData?.payload.filter((item) => item.name === photo.object)
                const objectInfo = objectData && objectData.length ? objectData.pop() : null

                if (objectInfo) {
                    return {
                        ...photo,
                        title: objectInfo.title,
                        text: objectInfo.text,
                        category: objectInfo.category
                    }
                }

                return photo
            }) : []
    }, [photoData, catalogData])

    const doFilteredPhotos = useCallback(() =>
        doPhotosList().length && doPhotosList().filter((photo: TPhoto & TCatalog) => category === '' || photo.category === category),
        [category, doPhotosList]
    )

    useEffect(() => {
        document.title = 'Список фотографий - Обсерватория'
    })

    return (
        <>
            {isError &&
                <Message
                    error
                    content='Возникла ошибка при получении списка отснятых объектов'
                />
            }
            {isSuccess &&
                <PhotoCategorySwitcher
                    active={category}
                    categories={doCategoriesList()}
                    onSelectCategory={(category) => setCategory(category)}
                />
            }
            <PhotoGrid
                loading={isLoading}
                photoList={doFilteredPhotos()}
            />
        </>
    )
}

export default PhotoList
