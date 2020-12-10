import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Sidebar, Menu, Icon, Container, Modal, Button, Form, Message } from 'semantic-ui-react'

import Header from '../components/Header'
import Footer from '../layouts/Footer'

import * as observatoryActions from '../store/observatory/actions'

import _ from 'lodash'

class MainContainer extends Component {

    state = {
        showSidebar: false,
        showModal: false,
        formLoading: false,
        userLogin: null,
        userPassw: null
    }

    setVisible = showSidebar => {
        this.setState({showSidebar})
    }

    setModal = showModal => {
        this.setState({showModal})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { dispatch } = this.props
        const { userLogin, userPassw } = this.state

        this.setState({formLoading: true})

        dispatch(observatoryActions.postAuthLogin(userLogin, userPassw))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authData !== prevProps.authData) {
            this.setState({formLoading: false})

            if (this.props.authData.status === true) {

            }
        }
    }

    render() {
        const { showSidebar, showModal, formLoading } = this.state
        const { updateTime, onUpdateData, children, authData } = this.props

        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => this.setVisible(false)}
                    vertical
                    visible={showSidebar}
                    width='thin'
                >
                    <Menu.Item as={NavLink} exact to='/'>
                        <Icon name='calendar check outline' />
                        Сводка
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/dashboard' activeClassName='active'>
                        <Icon name='dashboard' />
                        Управление
                    </Menu.Item>
                    <Menu.Item onClick={() => {this.setModal(true); this.setVisible(false)}} activeClassName='active'>
                        <Icon name='user circle' />
                        Авторизация
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={showSidebar}>
                    <Container>
                        <Header
                            updateTime={updateTime}
                            onUpdateData={onUpdateData}
                            onClickMenu={() => this.setVisible(true)}
                        />
                    </Container>
                    {children}
                    <Footer />
                </Sidebar.Pusher>
                <Modal
                    size={'tiny'}
                    open={showModal}
                    onClose={() => this.setModal(false)}
                >
                    <Modal.Header>Авторизация</Modal.Header>
                    <Modal.Content>
                        {(!_.isEmpty(authData) && authData.status === false) && (
                            <Message
                                error
                                content="Не верный логин или пароль"
                            />
                        )}
                        <Form
                            size='large'
                            loading={formLoading}
                            onSubmit={this.handleSubmit}
                        >
                            <Form.Input
                                fluid
                                icon='user'
                                name='userLogin'
                                iconPosition='left'
                                placeholder='Логин'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                name='userPassw'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
                                onChange={this.handleChange}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            size='small'
                            onClick={() => this.setModal(false)}
                            color='grey'
                        >
                            Отмена
                        </Button>
                        <Button
                            size='small'
                            onClick={() => this.handleSubmit()}
                            color='green'
                        >
                            Войти
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar.Pushable>
        )
    }
}

function mapStateToProps(state) {
    return {
        authData: state.observatory.authData,
    }
}

export default connect(mapStateToProps)(MainContainer)