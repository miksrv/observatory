import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sidebar as SidebarMenu, Menu, Label } from 'semantic-ui-react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useGetStatisticQuery } from '../app/observatoryApi'
import { hide } from '../app/sidebarSlice'
import { MENU_ITEMS } from '../app/menu'

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch()
    const visible = useAppSelector(state => state.sidebar.visible)
    const { data, isSuccess } = useGetStatisticQuery()

    return (
        <SidebarMenu
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => dispatch(hide())}
            vertical
            visible={visible}
            width='thin'
        >
            {MENU_ITEMS.map((item, key) =>
                <Menu.Item as={NavLink} onClick={() => dispatch(hide())} exact to={item.link}>
                    {item.name}
                    {item.label &&
                    <Label color='green' size='tiny'>{isSuccess ? data?.payload[item.label] : 0}</Label>
                    }
                </Menu.Item>
            )}
        </SidebarMenu>
    )
}

export default Sidebar
