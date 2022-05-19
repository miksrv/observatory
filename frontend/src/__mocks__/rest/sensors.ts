import { IRestResponse, TSensorsPayload } from '../../app/types'

const payload: TSensorsPayload = {
    time: 1652785847,
    sensors: {
        t: 15.4,
        h: 60.2,
        t1: 11.2,
        t2: 13.5,
        t3: 14.1
    }
}

export const response: IRestResponse = {
    status: true,
    payload: payload
}

export default response