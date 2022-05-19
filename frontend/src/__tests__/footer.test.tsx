import React from 'react'
import { render, screen } from '@testing-library/react'
import { version, update } from '../../package.json'

import '@testing-library/jest-dom/extend-expect'

import Footer from '../components/footer'

describe('Test Footer component', () => {
    beforeEach(() => {
        render(
            <Footer />
        )
    })

    it('Checked correct show version and update', async () => {
        expect(await screen.findByText(version)).toBeInTheDocument()
        expect(await screen.findByText(`(${update})`)).toBeInTheDocument()
    })
})