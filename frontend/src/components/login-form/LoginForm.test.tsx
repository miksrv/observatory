import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { store } from 'app/store';
import '@testing-library/jest-dom/extend-expect'

import LoginForm from './LoginForm'

describe('Component LoginForm', () => {
    it('Checked correct render', async () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        )
    })
})
