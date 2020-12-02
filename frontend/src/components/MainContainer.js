import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Sidebar, Menu, Icon, Container, Modal, Button, Form, Segment } from 'semantic-ui-react'

import Header from '../components/Header'
import Footer from '../layouts/Footer'

class MainContainer extends Component {

    state = {
        showSidebar: false,
        showModal: false
    }

    setVisible = showSidebar => {
        this.setState({showSidebar})
    }

    setModal = showModal => {
        this.setState({showModal})
    }

    render() {
        const { showSidebar, showModal } = this.state
        const { updateTime, onUpdateData, children } = this.props

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
                        <Form size='large'>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Логин'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
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
                            onClick={() => this.setModal(false)}
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

export default MainContainer