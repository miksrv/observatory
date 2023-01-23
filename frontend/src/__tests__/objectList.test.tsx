import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import ObjectList from 'pages/objectList/ObjectList'

describe('Test ObjectList feature', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <ObjectList/>
            </Provider>
        )
    })

    it('Checked correct render', () => {

    })
});
