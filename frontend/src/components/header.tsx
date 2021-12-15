import React from 'react'
import { Menu, Container, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { useGetStatisticQuery } from '../app/observatoryApi'
import { toggle } from '../app/sidebarSlice'
import { MENU_ITEMS } from '../app/menu'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()

    const currentMobile = (window.innerWidth <= 760)
    const { data, isSuccess } = useGetStatisticQuery()

    return (
        <Menu fixed='top' color='grey' className='menu' secondary inverted>
            <Container>
                {!currentMobile && <Menu.Item>
                    <img src='/logo-w.svg' alt='' />
                </Menu.Item>}
                {currentMobile ?
                    <Menu.Item
                        icon='bars'
                        className='hamburger'
                        onClick={() => dispatch(toggle())}
                    />
                    :
                    MENU_ITEMS.map((item, key) =>
                        <Menu.Item as={NavLink} exact to={item.link}>
                            {item.name}
                            {item.label &&
                                <Label color='green' size='tiny'>{isSuccess ? data?.payload[item.label] : 0}</Label>
                            }
                        </Menu.Item>
                    )
                }
            </Container>
        </Menu>
    )
}

export default Header
