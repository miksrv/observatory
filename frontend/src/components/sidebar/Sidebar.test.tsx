import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import { MENU_ITEMS } from 'app/menu'
import Sidebar from 'components/sidebar/Sidebar'

describe('Test Sidebar', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Sidebar/>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Checked correct render', async () => {
        MENU_ITEMS.forEach((item) => {
            expect(screen.queryByText(item.name)).toBeInTheDocument()
        })
    })
})
