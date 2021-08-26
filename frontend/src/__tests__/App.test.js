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

import * as functions from '../data/functions';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

describe('Test Functions', function () {
    it('Hello', () => {
        let filters = [
            {k: 'Red', v: 'filter-r'},
            {k: 'Green', v: 'filter-g'},
            {k: 'Blue', v: 'filter-b'},
            {k: 'Luminance', v: 'filter-l'},
            {k: 'Ha', v: 'filter-h'},
            {k: 'SII', v: 'filter-s'},
            {k: 'OIII', v: 'filter-o'},
            {k: '', v: ''},
        ]

        filters.forEach((item) => {
            expect(functions.setClassByFilter(item.k)).toBe(item.v);
        })
    })

    it('22', () => {
        expect(functions.getTimeFromSec(51365)).toBe('14:16')
        expect(functions.getTimeFromSec(51365, true)).toBe('14 часов 16 минут')
        expect(functions.getTimeFromSec(-10)).toBe('')
    })

    it('timeAgo', () => {
        expect(functions.timeAgo(null)).toBe('')
        expect(functions.timeAgo(-10)).toBe('')
        expect(functions.timeAgo(5320)).toBe(', 01 ч. 28 мин. 40 сек. назад')
    })
});

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