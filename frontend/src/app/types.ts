export interface IRestResponse {
    status: boolean,
    payload?: any,
    errorText?: string,
}

export interface IRestStatistic extends IRestResponse {
    payload: IStatistic
}

export interface IStatistic {
    photos: number,
    objects: number,
    shots: number,
    exposure: number,
    filesize: number
}