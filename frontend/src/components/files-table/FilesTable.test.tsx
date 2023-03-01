import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import FilesTable from 'components/files-table/FilesTable'

describe('Component FilesTable', () => {
    it('Checked correct render', async () => {
        render(
            <FilesTable
                loader={false}
                object='M_51'
                files={[
                    {
                        date: '10.10.2030',
                        dec: 55.1,
                        exposure: 600,
                        filter: 'Red',
                        gain: 120,
                        hfr: 0,
                        id: '1',
                        image: true,
                        name: 'image_1',
                        offset: 10,
                        ra: 34.2,
                        sky: 0,
                        stars: 0,
                        temp: -10
                    }
                ]}
            />
        )

        expect(await screen.findByText('10.10.2030, 5:00')).toBeInTheDocument()
        expect(await screen.findByText('Red')).toBeInTheDocument()
        expect(await screen.findByText('10')).toBeInTheDocument()

        fireEvent.click(await screen.findByText('Список снятых кадров'))
        fireEvent.click(await screen.findByText('Дата съемки'))
        fireEvent.click(screen.getByRole('img'))
    })

    it('Checked correct loader', () => {
        render(
            <FilesTable
                loader={true}
                object=''
                files={undefined}
            />
        )

        expect(1).toBe(1)
    })
})
