export type TObject = {
    ra: number
    dec: number
    name: string
}

export type geoJSON = {
    type: 'FeatureCollection'
    features: {
        type: 'Feature'
        id: string
        properties: {
            name: string
            mag: number
            dim: number
        }
        geometry: {
            type: string,
            coordinates: [number, number]
        }
    }[]
}
