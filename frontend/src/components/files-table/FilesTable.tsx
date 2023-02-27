import React, { useState, useEffect, useCallback } from 'react'
import { Dimmer, Loader, Table, Accordion, Icon } from 'semantic-ui-react'
import { TFIle } from 'app/types'
import { TObjectSortable, TSortOrdering } from './types'
import Lightbox from 'react-image-lightbox'
import RenderTableHeader from './RenderTableHeader'
import RenderTableRow from './RenderTableRow'

type TFilesTableProps = {
    loader: boolean
    object: string
    files: TFIle[] | undefined
}

const TableLoader: React.FC = () => <Dimmer active><Loader /></Dimmer>

const FilesTable: React.FC<TFilesTableProps> = (props) => {
    const { files, object, loader } = props

    const [ showLightbox, setShowLightbox ] = useState<boolean>(false)
    const [ photoIndex, setCurrentIndex ] = useState<number>(0)
    const [ photoList, setPhotoList ] = useState<string[]>([])
    const [ sortField, setSortField ] = useState<TObjectSortable>('date')
    const [ sortOrder, setSortOrder ] = useState<TSortOrdering>('ascending')
    const [ showAccordion, setAccordion ] = useState<boolean>(false)
    const [ filesList, setFilesList ] = useState<TFIle[]>([])

    const handlerSortClick = (field: TObjectSortable) => {
        if (sortField !== field) setSortField(field)
        else setSortOrder((sortOrder === 'ascending' ? 'descending' : 'ascending'))
    }

    const handlePhotoClick = (photoId: number) => {
        setCurrentIndex(photoId)
        setShowLightbox(true)
    }

    const doSortObjects = useCallback(() => {
        const filesListSort = files?.slice().sort((first, second) =>
            (sortOrder === 'descending' ? ((first[sortField] > second[sortField]) ? 1 : -1) : (first[sortField] < second[sortField]) ? 1 : -1)
        )

        if (filesListSort?.length) {
            setFilesList(filesListSort)
        }
    }, [files, sortOrder, sortField])

    useEffect(() => {
        if (filesList?.length) {
            const photoList = filesList
                .filter(file => file.image)
                .map(file => `${process.env.REACT_APP_API_HOST}uploads/${object}/${file.name}.jpg`)

            setPhotoList(photoList)
        }
    }, [filesList, object])

    useEffect(() => {
        doSortObjects()
    }, [files, sortField, sortOrder, doSortObjects])

    return (
        <div className='box table'>
            {loader && <TableLoader />}
            <Accordion inverted>
                <Accordion.Title active={showAccordion} onClick={() => setAccordion(!showAccordion)}>
                    <Icon name='dropdown' /> Список снятых кадров
                </Accordion.Title>
                <Accordion.Content active={showAccordion}>
                    {filesList.length && <Table sortable celled inverted selectable compact className='object-table'>
                        <RenderTableHeader
                            sort={sortField}
                            order={sortOrder}
                            handlerSortClick={(field: TObjectSortable) => handlerSortClick(field)}
                        />
                        <Table.Body>
                            {filesList.map((item, key) =>
                                <RenderTableRow
                                    item={item}
                                    itemId={key}
                                    object={object}
                                    onPhotoClick={handlePhotoClick}
                                    key={item.name}
                                />
                            )}
                        </Table.Body>
                    </Table>}
                </Accordion.Content>
            </Accordion>
            {showLightbox && photoList.length &&
                <Lightbox
                    mainSrc={photoList[photoIndex]}
                    nextSrc={photoList[(photoIndex + 1) % photoList.length]}
                    prevSrc={photoList[(photoIndex + photoList.length - 1) % photoList.length]}
                    onCloseRequest={() => setShowLightbox(false)}
                    onMovePrevRequest={() =>
                        setCurrentIndex((photoIndex + photoList.length - 1) % photoList.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentIndex((photoIndex + 1) % photoList.length)
                    }
                />
            }
        </div>
    )
}

export default FilesTable
