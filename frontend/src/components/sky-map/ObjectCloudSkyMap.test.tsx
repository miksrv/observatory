import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

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
    })
})
