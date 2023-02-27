import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import Header from 'components/header/Header'

describe('Test Header component', () => {
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
        // expect(screen.queryByText(/Сводка/i)).not.toBeInTheDocument()
        // expect(screen.queryByText(/Датчики/i)).not.toBeInTheDocument()
        // expect(screen.queryByText(/Статистика/i)).not.toBeInTheDocument()
        //
        fireEvent.click(await screen.findByText(/Войти/))

        fireEvent.change(await screen.findByPlaceholderText('Логин'), {target: {value: 'login'}})
        fireEvent.change(await screen.findByPlaceholderText('Пароль'), {target: {value: 'password'}})
    })
})
