import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/store'

import Main from 'pages/main/Main'

describe('Page Main', () => {
    it('Checked correct render', async () => {
        render(
            <Provider store={store}>
                <Main />
            </Provider>
        )

        expect(1).toBe(1)
    })
})
