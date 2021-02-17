import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Container, Modal, Button, Form, Message, Dropdown, Label } from 'semantic-ui-react'

// import Header from '../components/Header'
import Footer from '../layouts/Footer'

import * as astroActions from '../store/astro/actions'
import * as authActions from '../store/auth/actions'
import * as types from '../store/auth/actionTypes'

import languageRU from '../locate/ru/translate.json'

import _ from 'lodash'

class MainContainer extends Component {

    state = {
        showModal: false,
        formLoading: false,
        userLogin: null,
        userPassw: null,
        token: null,
        pingTimer: null
    }

    componentDidMount() {
        const { dispatch, storePhotoStatistic } = this.props
        const token = sessionStorage.getItem('token')

        _.isEmpty(storePhotoStatistic) && dispatch(astroActions.getFITStat())

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
    }

    pingCheckAuth = (tmpToken = null) => {
        const { dispatch } = this.props
        const { token } = this.state

        dispatch(authActions.Check((tmpToken !== null) ? tmpToken : token))
    }

    render() {
        const { showModal, formLoading, token } = this.state
        const { children, authData, storePhotoStatistic } = this.props

        return (
            <>
                <Container>
                    <br />
                    <Menu stackable inverted size='tiny'>
                        <Menu.Item>
                            <img src='/images/logo-w.svg' alt='' />
                        </Menu.Item>
                        <Menu.Item as={NavLink} exact to='/'>
                            {languageRU.menu.summary}
                        </Menu.Item>
                        <Menu.Item as={NavLink} exact to='/object/'>
                            {languageRU.menu.objects}
                            <Label color='yellow'>{(!_.isEmpty(storePhotoStatistic) ? storePhotoStatistic.objects : 0)}</Label>
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/dashboard' activeclassname='active'>
                            {languageRU.menu.control}
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Dropdown item text='Language'>
                                <Dropdown.Menu>
                                    <Dropdown.Item disabled>English</Dropdown.Item>
                                    <Dropdown.Item disabled>Russian</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {(token === null) ? (
                                <Menu.Item>
                                    <Button primary onClick={() => {this.setModal(true)}}>{languageRU.menu.login}</Button>
                                </Menu.Item>
                            ) : (
                                <Menu.Item>
                                    <Button onClick={() => {this.handleLogout()}}>{languageRU.menu.logout}</Button>
                                </Menu.Item>
                            )}
                        </Menu.Menu>
                    </Menu>
                </Container>
                <br /><br />
                {children}
                <Footer />
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
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        authData: state.auth.authData,
        storePhotoStatistic: state.astro.FITStat,
    }
}

export default connect(mapStateToProps)(MainContainer)