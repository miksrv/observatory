import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { update } from 'update'
import { version } from 'version'

import Footer from 'components/footer/Footer'

describe('Component Footer', () => {
    it('Checked correct show version and update', async () => {
        render(<Footer />)

        expect(await screen.findByText(version)).toBeInTheDocument()
        expect(await screen.findByText(`(${update})`)).toBeInTheDocument()
    })
})
