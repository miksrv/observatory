import React from 'react'
import { Grid, Icon, Dimmer, Loader, SemanticICONS } from 'semantic-ui-react'
import { getTimeFromSec } from 'functions/helpers'

import './styles.sass'

type TStatisticProps = {
    loader: boolean
    frames: number | undefined
    exposure: number | undefined
    objects: number | undefined
    filesize: number | undefined
}

type TCards = {
    name: string
    icon: SemanticICONS | undefined
    value: number | string
}

type TStatisticItemProps = { loader: boolean } & TCards

const StatisticItem = (props: TStatisticItemProps) =>
    <Grid.Column computer={4} tablet={8} mobile={16}>
        <div className='box table statistic'>
            {props.loader &&
                <Dimmer active>
                    <Loader />
                </Dimmer>
            }
            <div className='icon-container'>
                <Icon name={props.icon} />
            </div>
            <div>
                <div className='value'>{props.value}</div>
                <div className='info'>{props.name}</div>
            </div>
        </div>
    </Grid.Column>

const Statistic: React.FC<TStatisticProps> = (props) => {
    const { loader, frames, exposure, objects, filesize } = props
    const CARDS: TCards[] = [
        { name: 'Кадров', icon: 'photo', value: frames ? frames : 0 },
        { name: 'Выдержка', icon: 'clock outline', value: exposure ? getTimeFromSec(exposure) : 0 },
        { name: 'Объектов', icon: 'star outline', value: objects ? objects : 0 },
        { name: 'Данных (Гб)', icon: 'disk', value: filesize ? Math.round((filesize / 1024) * 100) / 100 : 0 },
    ]

    return (
        <Grid>
            {CARDS.map((item, key) =>
                <StatisticItem loader={loader} name={item.name} icon={item.icon} value={item.value} key={key} />
            )}
        </Grid>
    )
}

export default Statistic
