import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label, Menu, Sidebar as SidebarMenu } from 'semantic-ui-react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { MENU_ITEMS } from 'app/menu'
import { useGetStatisticQuery } from 'app/observatoryApi'

import { hide } from 'components/sidebar/sidebarSlice'

import './styles.sass'

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch()
    const visible = useAppSelector((state) => state.sidebar.visible)
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
            {MENU_ITEMS.map((item, key) => (
                <Menu.Item
                    as={NavLink}
                    onClick={() => dispatch(hide())}
                    exact
                    to={item.link}
                    key={key}
                >
                    {item.name}
                    {item.label && (
                        <Label
                            color='green'
                            size='tiny'
                        >
                            {isSuccess ? data?.payload[item.label] : 0}
                        </Label>
                    )}
                </Menu.Item>
            ))}
        </SidebarMenu>
    )
}

export default Sidebar
