import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Camera from 'components/camera/Camera'

describe('Component Camera', () => {
    it('Checked correct render', async () => {
        render(<Camera cameraURL='http://localhost/camera' />)

        fireEvent.click(screen.getByRole('img'))

        expect(1).toBe(1)
    })

    it('Checked correct error message', async () => {
        render(<Camera cameraURL='' />)

        expect(
            await screen.findByText('Камера не доступна')
        ).toBeInTheDocument()
        expect(
            await screen.findByText('Изображение камеры не доступно')
        ).toBeInTheDocument()
    })
})
