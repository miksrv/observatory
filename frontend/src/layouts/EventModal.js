import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const EventModal = (params) => {
    let handleOnClose = (state) => {
        params.fOnClose()
    }

    return (
        <Modal
            open={params.show}
            onClose={() => handleOnClose(false)}
            // onOpen={handleOnClose(true)}
        >
            <Modal.Header>Информация о погоде</Modal.Header>
            <Modal.Content>
                <p>test1111</p>
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