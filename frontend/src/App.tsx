import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sidebar as SidebarMenu, Container } from 'semantic-ui-react'
import { useAppSelector } from 'app/hooks'

import Header from 'components/header'
import Footer from 'components/footer'
import Sidebar from 'components/sidebar'

import Main from 'features/main'
import News from 'features/news'
import Map from 'features/map'
import PhotoList from 'features/photoList'
import PhotoItem from 'features/photoItem'
import ObjectList from 'features/objectList'
import ObjectItem from 'features/objectItem'
import Dashboard from 'features/dashboard'
import Error from 'features/error'

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
                            <Route component={Map} path='/map' exact />
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
