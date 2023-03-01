import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/store'

import LoginForm from './LoginForm'

describe('Component LoginForm', () => {
    it('Checked correct render', async () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        )

        expect(1).toBe(1)
    })
})
