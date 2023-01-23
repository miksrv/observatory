import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import ObjectTable from 'components/objectTable/ObjectTable'

describe('Test ObjectTable component', () => {
    it('Checked correct render', async () => {
        render(
            <BrowserRouter>
                <ObjectTable
                    objects={[
                        {
                            name: 'M51',
                            date: '10.10.2030',
                            frames: 15,
                            exposure: 2400,
                            Luminance: 10,
                            Red: 15,
                            Green: 0,
                            Blue: 0,
                            Ha: 0,
                            OIII: 0,
                            SII: 0,
                            title: 'Galaxy',
                            text: 'Galaxy description',
                            category: 'galaxies',
                            ra: 34.2,
                            dec: 17.8
                        },
                    ]}
                    photos={undefined}
                />
            </BrowserRouter>
        )

        expect(await screen.findByText('M51')).toBeInTheDocument()
        expect(await screen.findByText('00:40')).toBeInTheDocument()

        fireEvent.click(await screen.findByText('Объект'))
    })

    it('Checked correct error message', async () => {
        render(
            <BrowserRouter>
                <ObjectTable
                    objects={[]}
                    photos={undefined}
                />
            </BrowserRouter>
        )

        expect(await screen.findByText('Ничего не найдено, попробуйте изменить условия поиска')).toBeInTheDocument()
    })
})
