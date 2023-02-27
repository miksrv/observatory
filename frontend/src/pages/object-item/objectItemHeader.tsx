import React, {useState} from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Dimmer, Grid, Loader, Button } from 'semantic-ui-react'
import { getTimeFromSec } from 'functions/helpers'
import { useAppSelector } from 'app/hooks';
import { TCatalog, TObject } from 'app/types'

import ObjectEditModal from 'components/obect-edit-modal/ObjectEditModal';
import FilterList from 'components/filter-list/FilterList'
import SkyMap from 'components/sky-map/SkyMap'

import './styles.sass'

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
    const userLogin = useAppSelector(state => state.auth.status)
    const title = ! loader && (catalog ? (catalog.title ? catalog.title : catalog.name) : name)
    const date = ! loader && object ? moment.utc(object.date).utcOffset('GMT+05:00').format('D.MM.Y, H:mm') : '---'
    const category = ! loader && (catalog ? (catalog.category ? catalog.category : '---') : '---')
    const frames = ! loader ? object?.frames : '---'
    const exposure = ! loader && object ? getTimeFromSec(object.exposure, true) : '---'
    const size = ! loader && object ? Math.round((object.filesizes / 1024) * 100) / 100 : '---'

    const [ editModalVisible, setEditModalVisible ] = useState<boolean>(false)

    return (
        <div className='box'>
            {loader && <Dimmer active><Loader /></Dimmer>}
            <Grid>
                <Grid.Column computer={10} tablet={10} mobile={16}>
                    <div className='name'>
                        <h1>Объект: {title}</h1>
                        {userLogin && (
                            <div className='control-buttons'>
                                <Button
                                    size='mini'
                                    color='blue'
                                    icon='edit outline'
                                    onClick={() => setEditModalVisible(true)}
                                />
                                <Button
                                    size='mini'
                                    color='red'
                                    icon='remove'
                                />
                            </div>
                        )}
                    </div>
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
                <Grid.Column computer={6} tablet={6} mobile={16} className='skyMap'>
                    {catalog &&
                        <SkyMap
                            objects={
                                [{
                                    ra: catalog.ra,
                                    dec: catalog.dec,
                                    name: name
                                }]
                            }
                        />
                    }
                </Grid.Column>
            </Grid>
            <ObjectEditModal
                visible={editModalVisible}
                value={catalog!}
                onClose={() => setEditModalVisible(false)}
            />
        </div>
    )
}

export default ObjectItemHeader
