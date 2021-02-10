import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Sidebar, Menu, Icon, Container, Modal, Button, Form, Message, Dropdown, Label } from 'semantic-ui-react'

import Header from '../components/Header'
import Footer from '../layouts/Footer'

import * as authActions from '../store/auth/actions'
import * as types from '../store/auth/actionTypes'

import _ from 'lodash'

class MainContainer extends Component {

    state = {
        showSidebar: false,
        showModal: false,
        formLoading: false,
        userLogin: null,
        userPassw: null,
        token: null,
        pingTimer: null
    }

    componentDidMount() {
        const { dispatch } = this.props

        const token = sessionStorage.getItem('token')

        if (token) {
            this.setState({token: token})
            this.pingCheckAuth(token)
            this.startPingTimer()

            dispatch({ type: types.CHECK, payload: token })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { authData, dispatch } = this.props
        const { token, pingTimer } = this.state

        if (authData !== prevProps.authData) {
            this.setState({formLoading: false})

            if (authData.status === true && token === null) {
                sessionStorage.setItem('token', authData.token)
                dispatch({ type: types.CHECK, payload: token })

                this.setState({token: authData.token})
                this.setModal(false)
                this.startPingTimer()
            } else if (authData.status === false && token !== null) {
                sessionStorage.removeItem('token')
                dispatch({ type: types.CHECK, payload: null })

                this.setState({token: null})
                clearInterval(pingTimer)
            }
        }
    }

    componentWillUnmount() {
        const { pingTimer } = this.state

        clearInterval(pingTimer)
    }

    setSidebar = showSidebar => {
        this.setState({showSidebar})
    }

    setModal = showModal => {
        this.setState({showModal})
    }

    startPingTimer = () => {
        const pingTimer = setInterval(() => {
            this.pingCheckAuth()
        }, 60000)

        this.setState({
            pingTimer: pingTimer
        })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { dispatch } = this.props
        const { userLogin, userPassw } = this.state

        this.setState({formLoading: true})

        dispatch(authActions.Login(userLogin, userPassw))
    }

    handleLogout = () => {
        const { dispatch } = this.props
        const { token } = this.state

        dispatch(authActions.Logout(token))
        dispatch({ type: types.CHECK, payload: null })

        sessionStorage.removeItem('token')

        this.setState({token: null})
        this.setSidebar(false)
    }

    pingCheckAuth = (tmpToken = null) => {
        const { dispatch } = this.props
        const { token } = this.state

        dispatch(authActions.Check((tmpToken !== null) ? tmpToken : token))
    }

    render() {
        const { showSidebar, showModal, formLoading, token } = this.state
        const { updateTime, onUpdateData, children, authData, FITStat } = this.props

        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => this.setSidebar(false)}
                    vertical
                    visible={showSidebar}
                    width='thin'
                >
                    <Menu.Item as={NavLink} exact to='/'>
                        <Icon name='calendar check outline' />
                        Сводка
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/dashboard' activeclassname='active'>
                        <Icon name='dashboard' />
                        Управление
                    </Menu.Item>
                    {(token === null) ? (
                        <Menu.Item onClick={() => {this.setModal(true); this.setSidebar(false)}} activeclassname='active'>
                            <Icon name='user circle' />
                            Авторизация
                        </Menu.Item>
                    ) : (
                        <Menu.Item onClick={() => {this.handleLogout()}} activeclassname='active'>
                            <Icon name='log out' />
                            Выход
                        </Menu.Item>
                    )}
                </Sidebar>
                <Sidebar.Pusher dimmed={showSidebar}>
                    <Container>
                        <Menu stackable size='tiny'>
                            <Menu.Item>
                                <img src='/images/logo.svg' />
                            </Menu.Item>
                            <Menu.Item as={NavLink} exact to='/'>
                                Сводка
                            </Menu.Item>
                            <Menu.Item as={NavLink} exact to='/object/'>
                                Объекты
                                <Label color='yellow'>{(!_.isEmpty(FITStat) ? FITStat.objects : 0)}</Label>
                            </Menu.Item>
                            <Menu.Item as={NavLink} to='/dashboard' activeclassname='active'>
                                Управление
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Dropdown item text='Language'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>English</Dropdown.Item>
                                        <Dropdown.Item>Russian</Dropdown.Item>
                                        <Dropdown.Item>Spanish</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Menu.Item>
                                    <Button primary>Sign Up</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>

                        <Header
                            updateTime={updateTime}
                            onUpdateData={onUpdateData}
                            onClickMenu={() => this.setSidebar(true)}
                        />
                        {(token !== null) && (
                            <Message
                                error
                                content='Вы авторизованы, режим оператора включен - управление электропитанием активно'
                                className='admin-message'
                            />
                        )}
                    </Container>
                    {children}
                    <Footer />
                </Sidebar.Pusher>
                <Modal
                    size='tiny'
                    open={showModal}
                    onClose={() => this.setModal(false)}
                >
                    <Modal.Header>Авторизация</Modal.Header>
                    <Modal.Content>
                        {(!_.isEmpty(authData) && authData.status === false) && (
                            <Message
                                error
                                content="Неверный логин или пароль"
                            />
                        )}
                        <Form
                            size='large'
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Input
                                fluid
                                icon='user'
                                name='userLogin'
                                iconPosition='left'
                                placeholder='Логин'
                                onChange={this.handleChange}
                                disabled={formLoading}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                name='userPassw'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
                                onChange={this.handleChange}
                                disabled={formLoading}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            size='small'
                            onClick={() => this.handleSubmit()}
                            color='green'
                            disabled={formLoading}
                            loading={formLoading}
                        >
                            Войти
                        </Button>
                        <Button
                            size='small'
                            onClick={() => this.setModal(false)}
                            color='grey'
                        >
                            Отмена
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar.Pushable>
        )
    }
}

function mapStateToProps(state) {
    return {
        authData: state.auth.authData,
        FITStat: state.astro.FITStat,
    }
}

export default connect(mapStateToProps)(MainContainer)