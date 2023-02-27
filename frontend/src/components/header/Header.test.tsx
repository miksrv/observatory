import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { MENU_ITEMS } from 'app/menu';
import '@testing-library/jest-dom/extend-expect'

import Header from 'components/header/Header'

describe('Component Header', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                </BrowserRouter>
            </Provider>
        )
    })

    it('Checked correct show sidebar on page', async () => {
        MENU_ITEMS.forEach(({name}) => {
            expect(screen.queryByText(name)).toBeInTheDocument()
        })

        fireEvent.click(await screen.findByText(/Войти/))

        fireEvent.change(await screen.findByPlaceholderText('Логин'), {target: {value: 'login'}})
        fireEvent.change(await screen.findByPlaceholderText('Пароль'), {target: {value: 'password'}})
    })
})
