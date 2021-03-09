import React from 'react'
import { Button, Modal, List } from 'semantic-ui-react'
import { getTimeFromSec, setClassByFilter } from '../data/functions'

import moment from 'moment'

import _ from 'lodash'

const EventModal = (params) => {
    let astroData = params.data
    let handleOnClose = (state) => {
        params.fOnClose()
    }

    return (
        <Modal
            open={params.show}
            onClose={() => handleOnClose(false)}
            // onOpen={handleOnClose(true)}
        >
            <Modal.Header>Данные о съемке</Modal.Header>
            <Modal.Content>
                <div>Общая выдержка: <b>{getTimeFromSec(astroData.exposure)}</b> (часов:минут)</div>
                <div>Накоплено данных: <b>{astroData.filesize}</b> Гб</div>
                <div>Сделано кадров: <b>{astroData.frames}</b></div>
                <List>
                {! _.isEmpty(astroData) && astroData.data.map((item, key) => {
                    return (
                        <List.Item key={key}><span className={'filter ' + setClassByFilter(item.item_filter)}>{item.item_filter}</span> <b>{item.item_object}</b> {moment(item.item_date_obs).format("DD.MM.Y, H:mm:ss")}, {item.item_exptime} сек</List.Item>
                    )
                })}
                </List>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => handleOnClose(false)}>
                    Закрыть
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EventModal