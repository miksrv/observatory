import React from 'react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

type TObjectCloudProps = {
    loader: boolean
    current: string
    names: string[] | undefined
}

const ObjectCloud: React.FC<TObjectCloudProps> = (props) => {
    const { loader, current, names } = props

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
                names?.map((item) =>
                    <Link to={`/object/${item}`} className={current === item ? 'active' : ''}>
                        {item.replace(/_/g, ' ')}
                    </Link>
                )
            }
        </div>
    )
}

export default ObjectCloud