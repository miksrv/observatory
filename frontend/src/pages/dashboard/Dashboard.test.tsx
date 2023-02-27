import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import '@testing-library/jest-dom/extend-expect'

import Dashboard from 'pages/dashboard/Dashboard'
import Sensors from 'components/sensors/Sensors'

// eslint-disable-next-line jest/no-mocks-import
import { server } from '__mocks__/server'

describe('Test Dashboard feature', () => {

    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('Checked correct render', () => {
        render(
            <Provider store={store}>
                <Dashboard/>
            </Provider>
        )
    })

    it('Checked Sensor component mock', () => {
        render(
            <Provider store={store}>
                <Sensors/>
            </Provider>
        )
    })
});
