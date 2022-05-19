import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ObjectCloud from '../components/objectCloud'

describe('Test ObjectCloud component', () => {
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

        expect(screen.queryByText(/M51/i)).toBeInTheDocument()
        expect(screen.queryByText(/M52/i)).toBeInTheDocument()
    })
})