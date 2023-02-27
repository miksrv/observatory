import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import RelayList from './RelayList'

describe('Component RelayList', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <RelayList/>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Checked correct render', async () => {

    })
})
