import React, { useEffect, useMemo, useState } from 'react'
import { Message } from 'semantic-ui-react'

import {
    useGetCatalogListQuery,
    useGetPhotoListQuery
} from 'app/observatoryApi'
import { TCatalog, TPhoto } from 'app/types'

import PhotoCategorySwitcher from 'components/photo-category-switcher/PhotoCategorySwitcher'
import PhotoGrid from 'components/photo-grid/PhotoGrid'

const PhotoList: React.FC = () => {
    const [category, setCategory] = useState('')
    const {
        data: photoData,
        isSuccess,
        isLoading,
        isError
    } = useGetPhotoListQuery()
    const { data: catalogData } = useGetCatalogListQuery()

    const listCategories = useMemo(() => {
        return catalogData && catalogData.payload.length
            ? catalogData.payload
                  .map((item) => item.category)
                  .filter(
                      (item, index, self) =>
                          item !== '' && self.indexOf(item) === index
                  )
            : []
    }, [catalogData])

    const listPhotos: (TPhoto & TCatalog)[] | any = useMemo(() => {
        return photoData?.payload.length
            ? photoData?.payload.map((photo) => {
                  const objectData = catalogData?.payload.filter(
                      (item) => item.name === photo.object
                  )
                  const objectInfo =
                      objectData && objectData.length ? objectData.pop() : null

                  if (objectInfo) {
                      return {
                          ...photo,
                          category: objectInfo.category,
                          text: objectInfo.text,
                          title: objectInfo.title
                      }
                  }

                  return photo
              })
            : []
    }, [photoData, catalogData])

    const listFilteredPhotos = useMemo(
        () =>
            listPhotos.length &&
            listPhotos.filter(
                (photo: TPhoto & TCatalog) =>
                    category === '' || photo.category === category
            ),
        [category, listPhotos]
    )

    useEffect(() => {
        document.title = 'Список фотографий - Обсерватория'
    })

    return (
        <>
            {isError && (
                <Message
                    error
                    content='Возникла ошибка при получении списка отснятых объектов'
                />
            )}
            {isSuccess && (
                <PhotoCategorySwitcher
                    active={category}
                    categories={listCategories}
                    onSelectCategory={(category) => setCategory(category)}
                />
            )}
            <PhotoGrid
                loading={isLoading}
                photoList={listFilteredPhotos}
            />
        </>
    )
}

export default PhotoList