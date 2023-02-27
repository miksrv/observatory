import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'app/hooks';
import { Icon, Image, Table, Popup } from 'semantic-ui-react'
import { IObjectListItem, TCatalog, TFiltersTypes, TPhoto } from 'app/types'
import { getTimeFromSec, isOutdated } from 'functions/helpers'

import './styles.sass'

type TTableRowProps = {
    item: IObjectListItem & TCatalog
    photos: TPhoto[] | undefined
    onShowEdit?: (item: string) => void
}

const FILTERS: TFiltersTypes[] = ['Luminance', 'Red', 'Green', 'Blue', 'Ha', 'OIII', 'SII']

const RenderTableRow: React.FC<TTableRowProps> = (props) => {
    const { item, photos, onShowEdit } = props
    const userLogin = useAppSelector(state => state.auth.status)
    const photoList = photos && photos.filter((photo) => photo.object === item.name)
    const photoItem = photoList && photoList.pop()
    const textMaxLength = 200

    const doTextTruncate = useMemo(() => {
        if (item?.text) {
            return item.text.length > textMaxLength ? item.text.slice(0, textMaxLength) + '...' : item.text
        }

        return ''
    }, [item])

    return (
        <Table.Row className='table-row'>
            <Table.Cell className='cell-name'>
                <Popup
                    disabled={!item.title}
                    size='mini'
                    wide
                    header={item.title}
                    content={doTextTruncate}
                    trigger={
                        <Link to={`/object/${item.name}`}>
                            {item.name}
                        </Link>
                    }
                />
                {userLogin && (
                    <div>
                        <span
                            className='control-button'
                            onClick={() => onShowEdit?.(item.name)}
                        >
                            <Icon name='edit outline' />
                        </span>
                        <span
                            className='control-button'
                        >
                            <Icon name='remove' />
                        </span>
                    </div>
                )}
            </Table.Cell>
            <Table.Cell width='one'>
                {photoItem &&
                <Link to={`/photo/${item.name}`} className='photo-link'>
                    <Image
                        className='photo'
                        size='tiny'
                        src={`${process.env.REACT_APP_API_HOST}public/photo/${photoItem.file}_thumb.${photoItem.ext}`}
                    />
                    {isOutdated(photoItem.date, item.date) &&
                        <Popup
                            content='Фотография устарела, так как есть новые данные с телескопа, с помощью которых можно собрать новое изображение объекта'
                            size='mini'
                            trigger={
                                <Icon name='clock outline' className='outdated-icon'/>
                            }
                        />
                    }
                </Link>
                }
            </Table.Cell>
            <Table.Cell content={item.frames}/>
            <Table.Cell content={getTimeFromSec(item.exposure)}/>
            {FILTERS.map((filter) =>
                <Table.Cell
                    key={filter}
                    className={item[filter] > 0 ? `filter-${filter}` : ''}
                    content={getTimeFromSec(item[filter])}
                />
            )}
        </Table.Row>
    )
}

export default RenderTableRow
