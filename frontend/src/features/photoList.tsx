import React, { useState } from 'react'
import { useGetPhotoListQuery, useGetCatalogListQuery } from '../app/observatoryApi'
import { TPhoto, TCatalog } from '../app/types'

import CategoryToolbar from '../components/categoryToolbar'
import PhotoGrid from '../components/photoGrid'

const PhotoList: React.FC = () => {
    const [ category, setCategory ] = useState('')
    const { data: photoData, isSuccess, isLoading, isError } = useGetPhotoListQuery()
    const { data: catalogData } = useGetCatalogListQuery()

    const categories: string[] = []
    const photosList: TPhoto & TCatalog | any = isSuccess && photoData?.payload.map((photo) => {
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
    })

    const filteredPhotos = photosList && photosList.filter((photo: TPhoto & TCatalog) => category === '' || photo.category === category)

    document.title = 'Список фотографий - Обсерватория'

    if (catalogData) {
        catalogData.payload.forEach((item) => {
            if (! categories.includes(item.category) && item.category !== '') {
                categories.push(item.category)
            }
        })
    }

    return (
        <>
            {isError && <div>ОШИБКА!</div>}
            {isSuccess && <CategoryToolbar
                active={category}
                categories={categories}
                selectCategory={(category: string) => setCategory(category)}
            />}
            <PhotoGrid
                loading={isLoading}
                photoList={filteredPhotos}
            />
        </>
    )
}

export default PhotoList
