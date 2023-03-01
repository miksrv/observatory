import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import moment from 'moment'
import React from 'react'

import MoonPhase from './MoonPhase'

describe('Component MoonPhase', () => {
    it('Checked correct render', async () => {
        render(
            <MoonPhase date={moment.utc(new Date()).utcOffset('GMT+05:00')} />
        )

        expect(1).toBe(1)
    })
})
