import { IRestResponse, IStatistic } from 'app/types'

const payload: IStatistic = {
    exposure: 1766533,
    filesize: 187535,
    frames: 5720,
    objects: 86,
    photos: 60
}

export const response: IRestResponse = {
    payload: payload,
    status: true
}

export default response
