import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './store/reducers'

import 'moment/locale/ru'
import 'semantic-ui-css/semantic.min.css'
import './static/css/main.sass'

import Footer from './layouts/Footer'

import Main from './pages/Main'
import Object from './pages/Object'
import Error404 from './pages/Error404'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store} id='wrapper'>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/object/:name" component={Object} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
        <Footer />
    </Provider>
    , document.getElementById('root')
);