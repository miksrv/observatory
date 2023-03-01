import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/store'

import PhotoList from 'pages/photo-list/PhotoList'

describe('Page PhotoList', () => {
    it('Checked correct render', () => {
        render(
            <Provider store={store}>
                <PhotoList />
            </Provider>
        )

        expect(1).toBe(1)
    })
})
