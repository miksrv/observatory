import React, { useMemo, useState } from 'react'
import { Table } from 'semantic-ui-react'

import { IObjectListItem, TCatalog, TPhoto } from 'app/types'

import ObjectEditModal from 'components/obect-edit-modal/ObjectEditModal'

import RenderTableHeader, { HEADER_FIELDS } from './RenderTableHeader'
import RenderTableRow from './RenderTableRow'
import './styles.sass'
import { TObjectSortable, TSortOrdering } from './types'

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
    const [sortField, setSortField] = useState<TObjectSortable>('name')
    const [sortOrder, setSortOrder] = useState<TSortOrdering>('descending')
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
    const [editModalValue, setEditModalValue] = useState<TCatalog>()

    const listObjectsPhotos = useMemo(() => {
        return objects.map((item) => {
            const objectPhotos = photos?.filter(
                (photo) => photo.object === item.name
            )
            return {
                ...item,
                photo: objectPhotos ? objectPhotos.length : 0
            }
        })
    }, [objects, photos])

    const listSortedObjects = useMemo(() => {
        return listObjectsPhotos.sort((first, second) =>
            sortOrder === 'descending'
                ? first[sortField] > second[sortField]
                    ? 1
                    : -1
                : first[sortField] < second[sortField]
                ? 1
                : -1
        )
    }, [listObjectsPhotos, sortOrder, sortField])

    const handlerSortClick = (field: TObjectSortable) => {
        if (sortField !== field) setSortField(field)
        else
            setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    }

    // const handlerShowEditModal = () => {
    //
    // }

    return (
        <div className='box table'>
            <Table
                sortable
                celled
                inverted
                selectable
                compact
                className='object-table'
            >
                <RenderTableHeader
                    sort={sortField}
                    order={sortOrder}
                    handlerSortClick={(field: TObjectSortable) =>
                        handlerSortClick(field)
                    }
                />
                <Table.Body>
                    {listSortedObjects.length ? (
                        listSortedObjects.map((item) => (
                            <RenderTableRow
                                item={item}
                                photos={photos}
                                key={item.name}
                                onShowEdit={() => {
                                    setEditModalValue(item)
                                    setEditModalVisible(true)
                                }}
                            />
                        ))
                    ) : (
                        <RowNoData />
                    )}
                </Table.Body>
            </Table>
            <ObjectEditModal
                visible={editModalVisible}
                skyMapVisible={true}
                value={editModalValue}
                onClose={() => setEditModalVisible(false)}
            />
        </div>
    )
}

export default ObjectTable
