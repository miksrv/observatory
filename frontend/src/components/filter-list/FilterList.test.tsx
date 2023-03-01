import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'

import FilterList from 'components/filter-list/FilterList'

describe('Component FilterList', () => {
    it('Checked correct render', async () => {
        render(
            <FilterList
                filters={{
                    Blue: { exposure: 0, frames: 0 },
                    Green: { exposure: 500, frames: 21 },
                    Ha: { exposure: 0, frames: 0 },
                    Luminance: { exposure: 2400, frames: 54 },
                    OIII: { exposure: 0, frames: 0 },
                    Red: { exposure: 3100, frames: 61 },
                    SII: { exposure: 0, frames: 0 }
                }}
            />
        )

        expect(await screen.findByText('Luminance')).toBeInTheDocument()
        expect(await screen.findByText('Red')).toBeInTheDocument()
        expect(await screen.findByText('Green')).toBeInTheDocument()
    })
})
