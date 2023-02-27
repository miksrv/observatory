import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import Main from 'pages/main/Main'

describe('Page Main', () => {
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
