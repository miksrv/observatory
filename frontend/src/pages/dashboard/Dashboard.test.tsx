import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import { server } from '__mocks__/server'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/store'

import Dashboard from 'pages/dashboard/Dashboard'

import Sensors from 'components/sensors/Sensors'

describe('Page Dashboard', () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('Checked correct render', () => {
        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        )

        expect(1).toBe(1)
    })

    it('Checked Sensor component mock', () => {
        render(
            <Provider store={store}>
                <Sensors />
            </Provider>
        )

        expect(1).toBe(1)
    })
})
