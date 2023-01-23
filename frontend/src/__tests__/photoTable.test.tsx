import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import PhotoTable from 'components/photoTable/PhotoTable'

describe('Test PhotoTable component', () => {
    it('Checked correct render', async () => {
        render(
            <BrowserRouter>
                <PhotoTable
                    photos={[
                        {
                            object: 'M51',
                            date: '10.10.2030',
                            file: 'file',
                            ext: 'jpg',
                            author: null,
                        }
                    ]}
                />
            </BrowserRouter>
        )

        expect(await screen.findByText('10.10.2030')).toBeInTheDocument()

        fireEvent.click(await screen.getByText('Дата'))
        fireEvent.click(await screen.getByRole('img'))
    })
})
