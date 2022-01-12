import React, { useState } from 'react'
import { Modal, Message, Form, Button } from 'semantic-ui-react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useLoginMutation } from '../app/observatoryApi'
import { ICredentials } from '../app/types'
import { hide } from '../app/loginFormSlice'
import { setCredentials } from '../app/authSlice'

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const { visible } = useAppSelector(state => state.loginForm)
    const [ login, { isLoading } ] = useLoginMutation()
    const [ loginError, setLoginError ] = useState<boolean>(false)
    const [ formState, setFormState ] = useState<ICredentials>({
        username: '',
        password: ''
    })

    const handleChange = ({ target: { name, value }}: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const handleKeyDown = (e: { key: string }) => (e.key === 'Enter') && handleSubmit()

    const handleSubmit = async () => {
        try {
            const user = await login(formState).unwrap()

            if (user.status) {
                dispatch(setCredentials(user))
                dispatch(hide())
            } else {
                setLoginError(true)
            }
        } catch (error) {
            setLoginError(true)
            dispatch(hide())
        }
    }

    return (
        <Modal
            size='tiny'
            open={visible}
            onClose={() => dispatch(hide())}
        >
            <Modal.Header>Авторизация</Modal.Header>
            <Modal.Content>
                {loginError &&
                    <Message
                        error
                        content='Ошибка авторизации, неверный логин или пароль'
                    />
                }
                <Form
                    size='large'
                    onSubmit={handleSubmit}
                >
                    <Form.Input
                        fluid
                        name='username'
                        icon='user'
                        iconPosition='left'
                        placeholder='Логин'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
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
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    size='tiny'
                    onClick={handleSubmit}
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