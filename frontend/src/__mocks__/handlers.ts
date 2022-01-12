import { rest } from 'msw'

import currentData from './rest/statistic'

export const handlers = [
    rest.get('**/get/statistic', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(202, 'Mocked status'),
            ctx.json(currentData),
        )
    }),
]