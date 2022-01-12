import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import { IObjectListItem, TPhoto } from '../../app/types'
import { TObjectSortable, TSortOrdering } from './types'
import RenderTableHeader from './renderTableHeader'
import RenderTableRow from './renderTableRow'

type TObjectTable = {
    objects: IObjectListItem[] //(IObjectListItem & {photo: string})[]
    photos: TPhoto[] | undefined
}

type TObjectPhotoCount = (IObjectListItem & {photo: number})[]

const ObjectTable: React.FC<TObjectTable> = (props) => {
    const { objects, photos } = props
    const [ sortField, setSortField ] = useState<TObjectSortable>('name')
    const [ sortOrder, setSortOrder ] = useState<TSortOrdering>('descending')

    const shotObjects: TObjectPhotoCount = objects.map((item) => {
        const objectPhotos = photos?.filter((photo) => photo.object === item.name)
        return {
            ...item,
            photo: objectPhotos ? objectPhotos.length : 0
        }
    })

    const sortObjects = shotObjects.slice().sort((first, second) =>
        (sortOrder === 'descending' ? ((first[sortField] > second[sortField]) ? 1 : -1) : (first[sortField] < second[sortField]) ? 1 : -1)
    )

    const handlerSortClick = (field: TObjectSortable) => {
        if (sortField !== field) setSortField(field)
        else setSortOrder((sortOrder === 'ascending' ? 'descending' : 'ascending'))
    }

    return <Table sortable celled inverted selectable compact className='object-table'>
        <RenderTableHeader
            sort={sortField}
            order={sortOrder}
            handlerSortClick={(field: TObjectSortable) => handlerSortClick(field)}
        />
        <Table.Body>
            {sortObjects.map((item, key) =>
                <RenderTableRow item={item} photos={photos} key={key} />
            )}
        </Table.Body>
    </Table>
}

export default ObjectTable