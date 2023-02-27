import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sidebar as SidebarMenu, Container } from 'semantic-ui-react'
import { useAppSelector } from 'app/hooks'

import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import Sidebar from 'components/sidebar/Sidebar'

import Main from 'pages/main/Main'
import News from 'pages/news/News'
import ObjectsMap from 'pages/objects-map/ObjectsMap'
import PhotoList from 'pages/photo-list/PhotoList'
import PhotoItem from 'pages/photo-item/PhotoItem'
import ObjectList from 'pages/object-list/ObjectList'
import ObjectItem from 'pages/object-item/ObjectItem'
import Dashboard from 'pages/dashboard/Dashboard'
import Error from 'pages/error/Error'

const App: React.FC = () => {
    const visible = useAppSelector(state => state.sidebar.visible)

    return (
        <SidebarMenu.Pushable>
            <BrowserRouter>
                <Sidebar />
                <SidebarMenu.Pusher dimmed={visible}>
                    <Header />
                    <Container className='main'>
                        <Switch>
                            <Route component={Main} path='/' exact />
                            <Route component={News} path='/news' exact />
                            <Route component={ObjectsMap} path='/map' exact />
                            <Route component={PhotoList} path='/photos' exact />
                            <Route component={PhotoItem} path='/photo/:name' exact />
                            <Route component={ObjectList} path='/objects' exact />
                            <Route component={ObjectItem} path='/object/:name' exact />
                            <Route component={Dashboard} path='/dashboard' exact />
                            <Route component={Error} />
                        </Switch>
                    </Container>
                    <Footer />
                </SidebarMenu.Pusher>
            </BrowserRouter>
        </SidebarMenu.Pushable>
    )
}

export default App
