import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import Camera from 'components/camera/Camera'

describe('Component Camera', () => {
    it('Checked correct render', async () => {
        render(
            <Camera cameraURL='http://localhost/camera' />
        )

        fireEvent.click(await screen.getByRole('img'))
    })

    it('Checked correct error message', async () => {
        render(
            <Camera cameraURL='' />
        )

        expect(await screen.findByText('Камера не доступна')).toBeInTheDocument()
        expect(await screen.findByText('Изображение камеры не доступно')).toBeInTheDocument()
    })
})
