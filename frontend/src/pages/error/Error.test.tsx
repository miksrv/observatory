import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'app/store'

import Error from 'pages/error/Error'

describe('Page Error', () => {
    it('Checked correct text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Error />
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByText(/Error Page/i)).toBeInTheDocument()
    })
})
