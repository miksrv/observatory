import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RenderTableHeader from './RenderTableHeader';

describe('Component RenderTableHeader', () => {
    it('Checked correct render', () => {
        render(
            <RenderTableHeader
                sort={'date'}
                order={'ascending'}
            />
        )
    })
})
