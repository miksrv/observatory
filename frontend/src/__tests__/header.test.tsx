import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { render } from '@testing-library/react'
// import { fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '@testing-library/jest-dom/extend-expect'

import Header from '../components/header'

describe('Test Header', function () {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        )
    })

    it('Check correct show sidebar on page', async () => {
        // expect(screen.queryByText(/Сводка/i)).not.toBeInTheDocument()
        // expect(screen.queryByText(/Датчики/i)).not.toBeInTheDocument()
        // expect(screen.queryByText(/Статистика/i)).not.toBeInTheDocument()
        //
        // fireEvent.click(await screen.findByTestId(/open-menu/))
    })
});