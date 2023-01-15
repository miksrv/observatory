import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import PhotoList from 'features/photoList'

describe('Test PhotoList feature', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <PhotoList/>
            </Provider>
        )
    })

    it('Checked correct render', () => {

    })
});
