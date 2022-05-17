import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '@testing-library/jest-dom/extend-expect'

import Error from '../features/error'

describe('Test Error feature', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Error/>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Checked correct text', () => {
        expect(screen.queryByText(/Error Page/i)).toBeInTheDocument()
    })
});