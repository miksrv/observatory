import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import PhotoCategorySwitcher from 'components/photo-category-switcher/PhotoCategorySwitcher'

describe('Component PhotoCategorySwitcher', () => {
    it('Checked correct render', async () => {
        render(
            <PhotoCategorySwitcher
                active='M51'
                categories={['M51', 'M52', 'M53']}
                onSelectCategory={(category) => console.warn(category)}
            />
        )

        expect(screen.getByText(/M51/i)).toBeInTheDocument()
        expect(screen.getByText(/M52/i)).toBeInTheDocument()
        expect(screen.getByText(/M53/i)).toBeInTheDocument()

        fireEvent.click(await screen.findByText('M52'))
    })
})
