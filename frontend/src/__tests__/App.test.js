import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { BrowserRouter, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../store/reducers'

import Main from '../pages/Main'
import Dashboard from '../pages/Dashboard'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

describe('Test Main', function () {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Main />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Hello', () => {
        expect(screen.getByText(/Кадров/i)).toBeInTheDocument();
    })
});

describe('Test Dashboard', function () {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Dashboard />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Hello', () => {
        // console.log('store.getState()', store.getState())

        expect(screen.getByText(/Блок питания/i)).toBeInTheDocument()
        expect(screen.getByText(/Монтировка HEQ5 Pro/i)).toBeInTheDocument()
        expect(screen.getByText(/Камера ZWO ASI 1600MM/i)).toBeInTheDocument()
    })
});