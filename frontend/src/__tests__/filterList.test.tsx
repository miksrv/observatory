import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import FilterList from 'components/filterList/FilterList'

describe('Test FilterList component', () => {
    it('Checked correct render', async () => {
        render(
            <FilterList
                filters={{
                    Luminance: { exposure: 2400, frames: 54 },
                    Red: { exposure: 3100, frames: 61 },
                    Green: { exposure: 500, frames: 21 },
                    Blue: { exposure: 0, frames: 0 },
                    Ha: { exposure: 0, frames: 0 },
                    OIII: { exposure: 0, frames: 0 },
                    SII: { exposure: 0, frames: 0 },
                }}
            />
        )

        expect(await screen.findByText('Luminance')).toBeInTheDocument()
        expect(await screen.findByText('Red')).toBeInTheDocument()
        expect(await screen.findByText('Green')).toBeInTheDocument()
    })
})
