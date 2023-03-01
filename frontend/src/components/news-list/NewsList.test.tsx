import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import NewsItem from 'components/news-list/NewsItem'

describe('Component News', () => {
    it('Checked NewsItem component', async () => {
        const photo = {
            height: 768,
            src: 'https://localhost/image_src',
            width: 1024
        }

        render(
            <NewsItem
                news={{
                    comments: 10,
                    date: 1652781281,
                    likes: 15,
                    link: 'https://localhost/',
                    photos: [
                        {
                            full: photo,
                            thumb: photo
                        }
                    ],
                    reposts: 25,
                    text: 'News text',
                    views: 30
                }}
            />
        )

        expect(await screen.findByText('News text')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('img'))
    })
})
