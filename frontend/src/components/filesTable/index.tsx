import React, {useState} from 'react'
import {Dimmer, Loader, Table} from 'semantic-ui-react'
import { TFIle } from '../../app/types'
import { TObjectSortable, TSortOrdering } from './types'
import RenderTableHeader from './renderTableHeader'
import RenderTableRow from './renderTableRow'

type TFilesTableProps = {
    loader: boolean
    files: TFIle[] | undefined
}

const TableLoader: React.FC = () => <div className='box loader'>
    <Dimmer active>
        <Loader />
    </Dimmer>
</div>

const FilesTable: React.FC<TFilesTableProps> = (props) => {
    const { files, loader } = props

    const [ sortField, setSortField ] = useState<TObjectSortable>('date')
    const [ sortOrder, setSortOrder ] = useState<TSortOrdering>('ascending')

    const sortObjects = files && files.slice().sort((first, second) =>
        (sortOrder === 'descending' ? ((first[sortField] > second[sortField]) ? 1 : -1) : (first[sortField] < second[sortField]) ? 1 : -1)
    )

    const handlerSortClick = (field: TObjectSortable) => {
        if (sortField !== field) setSortField(field)
        else setSortOrder((sortOrder === 'ascending' ? 'descending' : 'ascending'))
    }

    return (
        <div className='box table'>
            {loader && <TableLoader />}
            {sortObjects && <Table sortable celled inverted selectable compact className='object-table'>
                <RenderTableHeader
                    sort={sortField}
                    order={sortOrder}
                    handlerSortClick={(field: TObjectSortable) => handlerSortClick(field)}
                />
                <Table.Body>
                    {sortObjects.map((item, key) => <RenderTableRow item={item} key={key} />)}
                </Table.Body>
            </Table>}
        </div>
    )
}

export default FilesTable