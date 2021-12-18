import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import { getTimeFromSec } from '../../functions/helpers'
import { TCatalog, TObject } from '../../app/types'

import FilterList from '../filterList'
import SkyMap from '../skyMap'

type TObjectHeaderProps = {
    name: string
    loader: boolean
    catalog: TCatalog | null | undefined
    object: TObject | undefined
    deviationRa: number
    deviationDec: number
}

const ObjectItemHeader: React.FC<TObjectHeaderProps> = (props) => {
    const { name, loader, catalog, object, deviationRa, deviationDec } = props
    const title = ! loader && (catalog ? (catalog.title ? catalog.title : catalog.name) : name)
    const date = ! loader && object ? moment.utc(object.date).utcOffset('GMT+05:00').format('D.MM.Y, H:mm') : '---'
    const category = ! loader && (catalog ? (catalog.category ? catalog.category : '---') : '---')
    const frames = ! loader ? object?.frames : '---'
    const exposure = ! loader && object ? getTimeFromSec(object.exposure, true) : '---'
    const size = ! loader && object ? Math.round((object.filesizes / 1024) * 100) / 100 : '---'

    return (
        <div className='box'>
            {loader && <Dimmer active><Loader /></Dimmer>}
            <Grid>
                <Grid.Column computer={11} tablet={11} mobile={16}>
                    <h1>Объект: {title}</h1>
                    <Grid>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <div><span className='second-color'>Категория:</span> {category}</div>
                            <div><span className='second-color'>Последний кадр:</span> {date}</div>
                            <div><span className='second-color'>Сделано кадров:</span> {frames}</div>
                            <div><span className='second-color'>Общая выдержка:</span> {exposure}</div>
                            <div><span className='second-color'>Накоплено данных:</span> {size} Гб</div>
                            <div><span className='second-color'>Отклонение (RA / DEC):</span> {deviationRa} / {deviationDec} </div>
                            <br />
                            <Link to='/objects/'>Вернуться к списку всех объектов</Link>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            {(! loader && object) && <FilterList filters={object.filters} />}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column computer={5} tablet={5} mobile={16} className='object-skymap'>
                    <SkyMap
                        objects={catalog ? [{
                            ra: catalog.ra,
                            dec: catalog.dec,
                            name: name
                        }] : undefined}
                    />
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ObjectItemHeader