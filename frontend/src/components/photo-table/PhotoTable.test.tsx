import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import PhotoTable from 'components/photo-table/PhotoTable'

describe('Component PhotoTable', () => {
    it('Checked correct render', async () => {
        render(
            <BrowserRouter>
                <PhotoTable
                    photos={[
                        {
                            author: null,
                            date: '10.10.2030',
                            ext: 'jpg',
                            file: 'file',
                            object: 'M51'
                        }
                    ]}
                />
            </BrowserRouter>
        )

        expect(await screen.findByText('10.10.2030')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Дата'))
        fireEvent.click(screen.getByRole('img'))
    })
})
