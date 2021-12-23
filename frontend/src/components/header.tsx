import React from 'react'
import { Menu, Container, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { useGetStatisticQuery } from '../app/observatoryApi'
import { toggle } from '../app/sidebarSlice'
import { show } from '../app/loginFormSlice'
import { MENU_ITEMS } from '../app/menu'
import { UserAuth } from './userAuth'

import LoginForm from './loginForm'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const currentMobile = (window.innerWidth <= 760)
    const { data, isSuccess } = useGetStatisticQuery()
    const user = UserAuth()

    return (
        <Menu fixed='top' color='grey' className='menu' secondary inverted>
            <Container>
                {!currentMobile &&
                    <Menu.Item className='logo'>
                        <img src='/logo-w.svg' alt='' />
                    </Menu.Item>
                }
                {currentMobile ?
                    <Menu.Item
                        icon='bars'
                        className='hamburger'
                        onClick={() => dispatch(toggle())}
                    />
                    :
                    MENU_ITEMS.map((item, key) =>
                        <Menu.Item as={NavLink} exact to={item.link} key={key}>
                            {item.name}
                            {item.label &&
                                <Label color='green' size='tiny'>{isSuccess ? data?.payload[item.label] : 0}</Label>
                            }
                        </Menu.Item>
                    )
                }
                {!currentMobile &&
                    <Menu.Menu position='right'>
                        {!user.status ?
                            <Menu.Item
                                name='Войти'
                                onClick={() => dispatch(show())}
                            />
                            :
                            <Menu.Item
                                name='Выйти'
                                onClick={() => {console.log('Выйти')}}
                            />
                        }
                    </Menu.Menu>
                }
            </Container>
            <LoginForm />
        </Menu>
    )
}

export default Header
