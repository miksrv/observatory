import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '@testing-library/jest-dom/extend-expect'

import Main from '../features/main'

describe('Test Main feature', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    })

    it('Checked correct render', async () => {

    })
});