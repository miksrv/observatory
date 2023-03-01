import { rest } from 'msw'

import statisticData from './rest/sensors'
import currentData from './rest/statistic'

export const handlers = [
    rest.get('**/get/statistic', (_req, res, ctx) => {
        return res(
            ctx.delay(0),
            ctx.status(202, 'Mocked status'),
            ctx.json(currentData)
        )
    }),
    rest.get('**/get/sensors/statistic', (_req, res, ctx) => {
        return res(
            ctx.delay(0),
            ctx.status(202, 'Mocked status'),
            ctx.json(statisticData)
        )
    })
]
