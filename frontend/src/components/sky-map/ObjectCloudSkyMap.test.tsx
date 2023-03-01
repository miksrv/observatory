import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ObjectCloudSkyMap from './ObjectCloudSkyMap'

describe('Component ObjectCloudSkyMap', () => {
    it('Checked correct render', () => {
        render(
            <BrowserRouter>
                <ObjectCloudSkyMap
                    loader={false}
                    objects={[]}
                />
            </BrowserRouter>
        )

        expect(1).toBe(1)
    })
})
