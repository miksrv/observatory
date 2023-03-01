import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ObjectCloud from 'components/object-cloud/ObjectCloud'

describe('Component ObjectCloud', () => {
    it('Checked correct render', () => {
        render(
            <BrowserRouter>
                <ObjectCloud
                    loader={false}
                    current='M51'
                    names={['M51', 'M52']}
                    link='photo'
                />
            </BrowserRouter>
        )

        expect(screen.getByText(/M51/i)).toBeInTheDocument()
        expect(screen.getByText(/M52/i)).toBeInTheDocument()
    })
})
