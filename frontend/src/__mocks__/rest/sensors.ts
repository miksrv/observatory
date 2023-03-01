import { IRestResponse, TSensorsPayload } from 'app/types'

const payload: TSensorsPayload = {
    sensors: {
        h: 60.2,
        t: 15.4,
        t1: 11.2,
        t2: 13.5,
        t3: 14.1
    },
    time: 1652785847
}

export const response: IRestResponse = {
    payload: payload,
    status: true
}

export default response
