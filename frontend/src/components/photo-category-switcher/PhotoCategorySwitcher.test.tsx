import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import PhotoCategorySwitcher from 'components/photo-category-switcher/PhotoCategorySwitcher'

describe('Test PhotoCategorySwitcher component', () => {
    beforeEach(() => {
        render(
            <PhotoCategorySwitcher
                active='M51'
                categories={['M51', 'M52', 'M53']}
                onSelectCategory={(category) => console.log(category)}
            />
        )
    })

    it('Checked correct render', async () => {
        expect(screen.queryByText(/M51/i)).toBeInTheDocument()
        expect(screen.queryByText(/M52/i)).toBeInTheDocument()
        expect(screen.queryByText(/M53/i)).toBeInTheDocument()

        fireEvent.click(await screen.findByText('M52'))
    })
})
