import React, { useState } from 'react'
import { Modal, Message, Form, Button } from 'semantic-ui-react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useLoginMutation } from '../app/observatoryApi'
import { hide } from '../app/loginFormSlice'

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const { visible } = useAppSelector(state => state.loginForm)
    const [ login, { isLoading } ] = useLoginMutation()
    const [ formState, setFormState ] = useState({
        username: '',
        password: ''
    })

    const handleChange = ({ target: { name, value }}: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    return (
        <Modal
            size='tiny'
            open={visible}
            onClose={() => dispatch(hide())}
        >
            <Modal.Header>Авторизация</Modal.Header>
            <Modal.Content>
                <Message
                    error
                    content='Ошибка?'
                />
                <Form
                    size='large'
                    onSubmit={() => console.log('submit')}
                >
                    <Form.Input
                        fluid
                        name='username'
                        icon='user'
                        iconPosition='left'
                        placeholder='Логин'
                        onChange={handleChange}
                        // onKeyDown={this._handleKeyDown}
                        disabled={isLoading}
                    />
                    <Form.Input
                        fluid
                        name='password'
                        icon='lock'
                        iconPosition='left'
                        placeholder='Пароль'
                        type='password'
                        onChange={handleChange}
                        // onKeyDown={this._handleKeyDown}
                        disabled={isLoading}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    size='tiny'
                    onClick={async () => {
                        console.log('user', formState)
                        try {
                            const user = await login(formState).unwrap()
                            console.log('user', user)
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                    color='green'
                    disabled={isLoading || (!formState.username || !formState.password)}
                    loading={isLoading}
                >
                    Войти
                </Button>
                <Button
                    size='small'
                    onClick={() => dispatch(hide())}
                    color='grey'
                >
                    Отмена
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default LoginForm