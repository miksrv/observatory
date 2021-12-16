import React from 'react'
import { useGetStatisticQuery, useGetPhotoListQuery } from '../app/observatoryApi'
import { shuffle } from '../functions/helpers'

import Statistic from '../components/statistic'
import PhotoGrid from '../components/photoGrid'

const Main: React.FC = () => {
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()

    const randomPhotos = photoData?.payload ? shuffle(photoData.payload.slice()).slice(0, 4) : undefined

    return (
        <>
            <Statistic
                loader={statisticLoading}
                frames={statisticData?.payload.frames}
                exposure={statisticData?.payload.exposure}
                objects={statisticData?.payload.objects}
                filesize={statisticData?.payload.filesize}
            />
            <br />
            <PhotoGrid
                loading={photosLoading}
                loaderCount={4}
                photoList={randomPhotos}
                className='photoRow-4'
            />
        </>
    )
}

export default Main
