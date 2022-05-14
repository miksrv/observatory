import React, { useState, useMemo } from 'react'
import { Table } from 'semantic-ui-react'
import { IObjectListItem, TPhoto, TCatalog } from '../../app/types'
import { TObjectSortable, TSortOrdering } from './types'
import RenderTableHeader, { HEADER_FIELDS } from './renderTableHeader'
import RenderTableRow from './renderTableRow'

import './styles.sass'

type TObjectTable = {
    objects: (IObjectListItem & TCatalog)[]
    photos: TPhoto[] | undefined
}

const RowNoData: React.FC = () => (
    <Table.Row>
        <Table.Cell
            textAlign='center'
            colSpan={HEADER_FIELDS.length}
            content='Ничего не найдено, попробуйте изменить условия поиска'
        />
    </Table.Row>
)

const ObjectTable: React.FC<TObjectTable> = (props) => {
    const { objects, photos } = props
    const [ sortField, setSortField ] = useState<TObjectSortable>('name')
    const [ sortOrder, setSortOrder ] = useState<TSortOrdering>('descending')

    const listObjectsPhotos = useMemo(() => {
        return objects.map((item) => {
            const objectPhotos = photos?.filter((photo) => photo.object === item.name)
            return {
                ...item,
                photo: objectPhotos ? objectPhotos.length : 0
            }
        })
    }, [objects, photos])

    const listSortedObjects = useMemo(() => {
        return listObjectsPhotos.sort((first, second) =>
            (sortOrder === 'descending' ? ((first[sortField] > second[sortField]) ? 1 : -1) : (first[sortField] < second[sortField]) ? 1 : -1)
        )
    }, [listObjectsPhotos, sortOrder, sortField])

    const handlerSortClick = (field: TObjectSortable) => {
        if (sortField !== field) setSortField(field)
        else setSortOrder((sortOrder === 'ascending' ? 'descending' : 'ascending'))
    }

    return (
        <div className='box table'>
            <Table sortable celled inverted selectable compact className='object-table'>
                <RenderTableHeader
                    sort={sortField}
                    order={sortOrder}
                    handlerSortClick={(field: TObjectSortable) => handlerSortClick(field)}
                />
                <Table.Body>
                    {listSortedObjects.length
                        ? listSortedObjects.map((item) =>
                            <RenderTableRow
                                item={item}
                                photos={photos}
                                key={item.name}
                            />
                        )
                        : <RowNoData/>
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default ObjectTable