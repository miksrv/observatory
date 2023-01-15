import React, { useEffect, useState } from 'react'
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react'
import { useGetRelayListQuery, useGetRelayStateQuery, useSetRelayStatusMutation } from 'app/observatoryApi'
import { useAppSelector } from 'app/hooks'
import { IRelaySet } from 'app/types'

import './styles.sass'

type TRelayListItemProps = {
    index: number
    name: string
    status: boolean
    loading: boolean
    auth: boolean
    handleClick: (data: IRelaySet) => void
}

const RelayListItem: React.FC<TRelayListItemProps> = (props) => {
    const { index, name, status, loading, auth, handleClick } = props
    const switchClass: string = status ? 'on' : 'off'

    return (
        <div className='item'>
            <div className='name'>
                <span className={`led-${switchClass}`} />{name}
            </div>
            <Button
                loading={loading}
                className={`switch-${switchClass}`}
                disabled={(loading || ! auth)}
                onClick={() => handleClick({index: index, state: (status ? 0 : 1)})}
                size='tiny'
            >{switchClass}</Button>
        </div>
    )
}

const RelayList: React.FC = () => {
    const { data: relayList, isError, isLoading } = useGetRelayListQuery()
    const { data: relayState, isFetching: loaderState } = useGetRelayStateQuery(null, { pollingInterval: 15 * 1000 })
    const [ setRelayStatus, { isLoading: loaderSet } ] = useSetRelayStatusMutation()
    const [ isAuth, setIsAuth ] = useState<boolean>(false)
    const user = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isAuth !== user.status) setIsAuth(user.status)
    }, [user, isAuth])

    return isLoading ?
        <div className='box relay-list loader'>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </div>
        :
        (isError || relayList === undefined || !relayList.status) ?
            <Message
                error
                content='Возникла ошибка при получении списка управляемых реле'
            />
            :
            <div className='box relay-list'>
                {isAuth && relayState?.status === false &&
                    <Dimmer active>
                        <Message
                            error
                            icon='warning sign'
                            header='Ошибка получения состояния реле'
                            content='Контроллер обсерватории не отвечает на запрос'
                        />
                    </Dimmer>
                }
                {relayList.payload.map((item, key) =>
                    <RelayListItem
                        key={key}
                        index={key}
                        name={item}
                        status={relayState?.status === true ? relayState?.payload[key] : false}
                        // loading={(!isSuccess && isFetching) || (relayState?.status === true && typeof relayState?.payload[key] === 'undefined')}
                        loading={loaderState || loaderSet}
                        auth={isAuth && relayState?.status === true}
                        handleClick={async (relay) => await setRelayStatus(relay)}
                    />
                )}
            </div>
}

export default RelayList
