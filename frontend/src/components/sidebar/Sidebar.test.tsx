import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MENU_ITEMS } from 'app/menu'
import { store } from 'app/store'

import Sidebar from 'components/sidebar/Sidebar'

describe('Component Sidebar', () => {
    it('Checked correct render', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </Provider>
        )

        MENU_ITEMS.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument()
        })
    })
})
