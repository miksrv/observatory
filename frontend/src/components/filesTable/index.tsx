import React, { useState } from 'react'
import { Dimmer, Loader, Table, Accordion, Icon } from 'semantic-ui-react'
import { TFIle } from '../../app/types'
import { TObjectSortable, TSortOrdering } from './types'
import RenderTableHeader from './renderTableHeader'
import RenderTableRow from './renderTableRow'

type TFilesTableProps = {
    loader: boolean
    files: TFIle[] | undefined
}

const TableLoader: React.FC = () => <Dimmer active><Loader /></Dimmer>

const FilesTable: React.FC<TFilesTableProps> = (props) => {
    const { files, loader } = props

    const [ sortField, setSortField ] = useState<TObjectSortable>('date')
    const [ sortOrder, setSortOrder ] = useState<TSortOrdering>('ascending')
    const [ showAccordion, setAccordion ] = useState<boolean>(false)

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
            <Accordion inverted>
                <Accordion.Title active={showAccordion} onClick={() => setAccordion(!showAccordion)}>
                    <Icon name='dropdown' /> Список снятых кадров
                </Accordion.Title>
                <Accordion.Content active={showAccordion}>
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
                </Accordion.Content>
            </Accordion>
        </div>
    )
}

export default FilesTable