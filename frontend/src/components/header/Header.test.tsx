import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { MENU_ITEMS } from 'app/menu'
import { store } from 'app/store'

import Header from 'components/header/Header'

describe('Component Header', () => {
    it('Checked correct show sidebar on page', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        )

        MENU_ITEMS.forEach(({ name }) => {
            expect(screen.getByText(name)).toBeInTheDocument()
        })

        fireEvent.click(await screen.findByText(/Войти/))

        fireEvent.change(await screen.findByPlaceholderText('Логин'), {
            target: { value: 'login' }
        })
        fireEvent.change(await screen.findByPlaceholderText('Пароль'), {
            target: { value: 'password' }
        })
    })
})
