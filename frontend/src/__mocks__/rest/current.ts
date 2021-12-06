import { IStatistic, IRestResponse } from '../../app/types'

const payload: IStatistic = {
    photos: 60,
    objects: 80,
    shots: 5622,
    exposure: 1743373,
    filesize: 184322
}

export const response: IRestResponse = {
    status: true,
    payload: payload
}

export default response