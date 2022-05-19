import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import FilesTable from '../components/filesTable'

describe('Test FilesTable component', () => {
    it('Checked correct render', async () => {
        render(
            <FilesTable
                loader={false}
                object='M_51'
                files={[
                    {
                        id: '1',
                        name: 'image_1',
                        date: '10.10.2030',
                        filter: 'Red',
                        exposure: 600,
                        temp: -10,
                        gain: 120,
                        offset: 10,
                        dec: 55.1,
                        ra: 34.2,
                        stars: 0,
                        hfr: 0,
                        sky: 0,
                        image: true
                    }
                ]}
            />
        )

        expect(await screen.findByText('10.10.2030, 5:00')).toBeInTheDocument()
        expect(await screen.findByText('Red')).toBeInTheDocument()
        expect(await screen.findByText('10')).toBeInTheDocument()

        fireEvent.click(await screen.findByText('Список снятых кадров'))
        fireEvent.click(await screen.findByText('Дата съемки'))
        fireEvent.click(await screen.getByRole('img'))
    })

    it('Checked correct loader', () => {
        render(
            <FilesTable
                loader={true}
                object=''
                files={undefined}
            />
        )
    })
})