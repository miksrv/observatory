import React from 'react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import './styles.sass'

type TObjectCloudProps = {
    loader: boolean
    current: string
    names: string[] | undefined
    link: string
}

const ObjectCloud: React.FC<TObjectCloudProps> = (props) => {
    const { loader, current, names, link } = props

    return (
        <div className='box object-cloud'>
            {loader ?
                <>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                    <div>Загрузка...</div>
                </>
                :
                names?.map((item , key) =>
                    <Link to={`/${link}/${item}`} className={current === item ? 'active' : ''} key={key}>
                        {item.replace(/_/g, ' ')}
                    </Link>
                )
            }
        </div>
    )
}

export default ObjectCloud