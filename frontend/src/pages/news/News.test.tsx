import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from 'app/store'

import News from 'pages/news/News'

describe('Page News', () => {
    it('Checked correct render', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <News />
                </BrowserRouter>
            </Provider>
        )

        expect(1).toBe(1)
    })
})
