import React, { useEffect, useState, useMemo } from 'react'
import { Dimmer, Loader, Message } from 'semantic-ui-react'
import { useGetCatalogListQuery, useGetObjectListQuery, useGetPhotoListQuery } from 'app/observatoryApi'
import { IObjectListItem, TCatalog } from 'app/types'

import ObjectTable from 'components/object-table/ObjectTable'
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

    const listObjects = useMemo(() => {
        if (objectData?.payload.length) {
            return objectData.payload.map((item) => ({
                ...item,
                ...catalogData?.payload.filter((catalog) => item.name === catalog.name).pop()
            }))
        }

        return []
    }, [objectData, catalogData])

    const listFilteredObjects = useMemo((): (IObjectListItem & TCatalog)[] | any => {
        return listObjects.length
            ? listObjects.filter((item) =>
                (search === '' || (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.title?.toLowerCase().includes(search.toLowerCase())
                ))
                &&
                (!categories.length || categories.includes(item?.category ? item?.category : ''))
            ) : []
    }, [search, categories, listObjects])

    const listCategories = useMemo(() => {
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
                categories={listCategories}
                onChangeSearch={setSearch}
                onChangeCategories={setCategories}
            />
            {isLoading && <TableLoader />}
            {(isSuccess && objectData?.payload.length) &&
                <ObjectTable
                    objects={listFilteredObjects}
                    photos={photoData?.payload}
                />
            }
        </>
    )
}

export default ObjectList
