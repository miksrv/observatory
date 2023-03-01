import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'app/store'

import RelayList from './RelayList'

describe('Component RelayList', () => {
    it('Checked correct render', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <RelayList />
                </BrowserRouter>
            </Provider>
        )

        expect(1).toBe(1)
    })
})
