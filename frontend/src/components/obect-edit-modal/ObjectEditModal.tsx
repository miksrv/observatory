import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Modal } from 'semantic-ui-react'

import { TCatalog } from 'app/types'

import SkyMap from '../sky-map/SkyMap'
import './styles.sass'

interface IObjectEditModal {
    visible: boolean
    value?: TCatalog
    skyMapVisible?: boolean
    onClose?: () => void
}

const ObjectEditModal: React.FC<IObjectEditModal> = (props) => {
    const { visible, value, skyMapVisible, onClose } = props

    const [formState, setFormState] = useState<TCatalog>({
        category: value?.category || '',
        dec: value?.dec || 0,
        name: value?.name || '',
        ra: value?.ra || 0,
        text: value?.text || '',
        title: value?.title || ''
    })

    const handleChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handleKeyDown = (e: { key: string }) =>
        e.key === 'Enter' && handleSubmit()

    const handleSubmit = async () => {
        // try {
        //     const user = await login(formState).unwrap()
        //
        //     if (user.status) {
        //         dispatch(setCredentials(user))
        //         dispatch(hide())
        //     } else {
        //         setLoginError(true)
        //     }
        // } catch (error) {
        //     setLoginError(true)
        //     dispatch(hide())
        // }
    }

    useEffect(() => {
        if (value) {
            setFormState(value)
        }
    }, [value])

    return (
        <Modal
            size='small'
            open={visible}
            onClose={onClose}
        >
            <Modal.Header>Редактирование объекта</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        name='title'
                        label='Название'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        defaultValue={value?.title}
                    />
                    <Form.Input
                        fluid
                        name='category'
                        label='Категория'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        defaultValue={value?.category}
                    />
                    <Form.TextArea
                        onChange={(event, data) =>
                            setFormState((prev) => ({
                                ...prev,
                                text: data.value?.toString()!
                            }))
                        }
                        label='Описание'
                        onKeyDown={handleKeyDown}
                        defaultValue={value?.text}
                        rows={7}
                    />
                    <Grid>
                        <Grid.Column width={skyMapVisible ? 6 : 16}>
                            <Form.Input
                                required
                                name='name'
                                label='Идентификатор'
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                defaultValue={value?.name}
                            />
                            <Form.Input
                                required
                                name='ra'
                                label='RA'
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                defaultValue={value?.ra}
                            />
                            <Form.Input
                                required
                                name='dec'
                                label='DEC'
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                defaultValue={value?.dec}
                            />
                        </Grid.Column>
                        {skyMapVisible && (
                            <Grid.Column
                                width={10}
                                className='skyMap'
                            >
                                <SkyMap
                                    objects={[
                                        {
                                            dec: Number(formState?.dec) || 0,
                                            name: formState?.name || '',
                                            ra: Number(formState?.ra) || 0
                                        }
                                    ]}
                                />
                            </Grid.Column>
                        )}
                    </Grid>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    size='tiny'
                    onClick={handleSubmit}
                    color='green'
                    // disabled={isLoading || (!formState.username || !formState.password)}
                    // loading={isLoading}
                >
                    Сохранить
                </Button>
                <Button
                    size='small'
                    onClick={onClose}
                    color='grey'
                >
                    Отмена
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ObjectEditModal
