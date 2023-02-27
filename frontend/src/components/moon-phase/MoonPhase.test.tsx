import React from 'react'
import moment from 'moment';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MoonPhase from './MoonPhase'

describe('Component MoonPhase', () => {
    it('Checked correct render', async () => {
        render(
            <MoonPhase date={moment.utc(new Date()).utcOffset('GMT+05:00')} />
        )
    })
})
