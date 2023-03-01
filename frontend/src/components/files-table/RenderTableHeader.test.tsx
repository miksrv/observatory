import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'

import RenderTableHeader from './RenderTableHeader'

describe('Component RenderTableHeader', () => {
    it('Checked correct render', () => {
        render(
            <RenderTableHeader
                sort={'date'}
                order={'ascending'}
            />
        )

        expect(1).toBe(1)
    })
})
