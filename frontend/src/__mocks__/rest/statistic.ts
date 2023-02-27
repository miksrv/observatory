import { IStatistic, IRestResponse } from 'app/types'

const payload: IStatistic = {
    photos: 60,
    objects: 86,
    frames: 5720,
    exposure: 1766533,
    filesize: 187535
}

export const response: IRestResponse = {
    status: true,
    payload: payload
}

export default response
