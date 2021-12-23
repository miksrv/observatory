import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {Image, Table} from 'semantic-ui-react'
import { IObjectListItem, TFiltersTypes, TPhoto } from '../../app/types'
import { getTimeFromSec } from '../../functions/helpers'

type TTableRowProps = {
    item: IObjectListItem
    photos: TPhoto[] | undefined
}

const FILTERS: TFiltersTypes[] = ['Luminance', 'Red', 'Green', 'Blue', 'Ha', 'OIII', 'SII']

const isOutdated = (date1: string, date2: string) => moment(date1).diff(moment(date2)) < 0

const RenderTableRow: React.FC<TTableRowProps> = (props) => {
    const { item, photos } = props
    const photoList = photos && photos.filter((photo) => photo.object === item.name)
    const photoItem = photoList && photoList.pop()

    return <Table.Row>
        <Table.Cell><Link to={`/object/${item.name}`}>{item.name}</Link></Table.Cell>
        <Table.Cell width='one'>
            {photoItem &&
                <Link to={`/photo/${item.name}`}>
                    <Image
                        className={'photo ' + (isOutdated(photoItem.date, item.date) ? 'outdated' : 'actual')}
                        size='tiny'
                        src={`https://api.miksoft.pro/public/photo/${photoItem.file}_thumb.${photoItem.ext}`}
                    />
                </Link>
            }
        </Table.Cell>
        <Table.Cell>{item.frames}</Table.Cell>
        <Table.Cell>{getTimeFromSec(item.exposure)}</Table.Cell>
        {FILTERS.map((filter, key) =>
            <Table.Cell key={key} className={item[filter] > 0 ? `filter-${filter}` : ''}>
                {getTimeFromSec(item[filter])}
            </Table.Cell>
        )}
    </Table.Row>
}

export default RenderTableRow