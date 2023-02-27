import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import NewsItem from 'components/news-list/newsItem'

describe('Test News feature', () => {
    it('Checked NewsItem component', async () => {
        const photo = {
            height: 768,
            width: 1024,
            src: 'https://localhost/image_src'
        }

        render(
            <NewsItem
                news={{
                    date: 1652781281,
                    text: 'News text',
                    link: 'https://localhost/',
                    comments: 10,
                    likes: 15,
                    reposts: 25,
                    views: 30,
                    photos: [
                        {
                            full: photo,
                            thumb: photo,
                        }
                    ]
                }}
            />
        )

        expect(await screen.findByText('News text')).toBeInTheDocument()

        fireEvent.click(await screen.getByRole('img'))
    })
})
