import React, { useEffect, useState, useCallback } from 'react'
import { Dimmer, Loader, Message } from 'semantic-ui-react'
import { useGetCatalogListQuery, useGetObjectListQuery, useGetPhotoListQuery } from '../../app/observatoryApi'
import { IObjectListItem, TCatalog } from '../../app/types'

import ObjectTable from '../../components/objectTable'
import ObjectsTableToolbar from './ObjectsTableToolbar'

import './styles.sass'

const TableLoader: React.FC = () => (
    <div className='box loader'>
        <Dimmer active>
            <Loader />
        </Dimmer>
    </div>
)

const ObjectList: React.FC = () => {
    const [ search, setSearch ] = useState<string>('')
    const [ categories, setCategories ] = useState<string[]>([])
    const { data: objectData, isSuccess, isLoading, isError } = useGetObjectListQuery();
    const { data: photoData } = useGetPhotoListQuery();
    const { data: catalogData } = useGetCatalogListQuery()

    const doObjects = useCallback(() => {
        if (objectData?.payload.length) {
            return objectData.payload.map((item) => ({
                ...item,
                ...catalogData?.payload.filter((catalog) => item.name === catalog.name).pop()
            }))
        }

        return []
    }, [objectData, catalogData])

    const doFilterObjects = useCallback((): (IObjectListItem & TCatalog)[] | any => {
        return doObjects().length
            ? doObjects().filter((item) =>
                (search === '' || (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.title?.toLowerCase().includes(search.toLowerCase())
                ))
                &&
                (!categories.length || categories.includes(item?.category ? item?.category : ''))
            ) : []
    }, [search, categories, doObjects])

    const doCategoriesList = useCallback(() => {
        return catalogData && catalogData.payload.length
            ? catalogData.payload
                .map((item) => item.category)
                .filter((item, index, self) => item !== '' && self.indexOf(item) === index)
            : []
    }, [catalogData])

    useEffect(() => {
        document.title = 'Список астрономических объектов - Обсерватория'
    })

    return (
        <>
            {isError &&
                <Message
                    error
                    content='Возникла ошибка при получении списка объектов'
                />
            }
            <ObjectsTableToolbar
                search={search}
                categories={doCategoriesList()}
                onChangeSearch={setSearch}
                onChangeCategories={setCategories}
            />
            {isLoading && <TableLoader />}
            {(isSuccess && objectData?.payload.length) &&
                <ObjectTable
                    objects={doFilterObjects()}
                    photos={photoData?.payload}
                />
            }
        </>
    )
}

export default ObjectList
