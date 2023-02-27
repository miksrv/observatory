import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import News from 'pages/news/News'

describe('Page News', () => {
    it('Checked correct render', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <News/>
                </BrowserRouter>
            </Provider>
        )
    })
})
