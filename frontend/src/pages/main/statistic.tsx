import React from 'react'
import { Dimmer, Grid, Icon, Loader, SemanticICONS } from 'semantic-ui-react'

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

const StatisticItem = (props: TStatisticItemProps) => (
    <Grid.Column
        computer={4}
        tablet={8}
        mobile={16}
    >
        <div className='box table statistic'>
            {props.loader && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <div className='icon-container'>
                <Icon name={props.icon} />
            </div>
            <div>
                <div className='value'>{props.value}</div>
                <div className='info'>{props.name}</div>
            </div>
        </div>
    </Grid.Column>
)

const Statistic: React.FC<TStatisticProps> = (props) => {
    const { loader, frames, exposure, objects, filesize } = props
    const CARDS: TCards[] = [
        { icon: 'photo', name: 'Кадров', value: frames ? frames : 0 },
        {
            icon: 'clock outline',
            name: 'Выдержка',
            value: exposure ? getTimeFromSec(exposure) : 0
        },
        {
            icon: 'star outline',
            name: 'Объектов',
            value: objects ? objects : 0
        },
        {
            icon: 'disk',
            name: 'Данных (Гб)',
            value: filesize ? Math.round((filesize / 1024) * 100) / 100 : 0
        }
    ]

    return (
        <Grid>
            {CARDS.map((item, key) => (
                <StatisticItem
                    loader={loader}
                    name={item.name}
                    icon={item.icon}
                    value={item.value}
                    key={key}
                />
            ))}
        </Grid>
    )
}

export default Statistic
