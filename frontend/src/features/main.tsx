import React from 'react'
import { useGetStatisticQuery, useGetPhotoListQuery, useGetWeatherMonthQuery } from '../app/observatoryApi'
import { shuffle } from '../functions/helpers'

import Statistic from '../components/statistic'
import PhotoGrid from '../components/photoGrid'
import Calendar from '../components/calendar'

const Main: React.FC = () => {
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()

    const { data: weatherData } = useGetWeatherMonthQuery()

    const randomPhotos = photoData?.payload ? shuffle(photoData.payload.slice()).slice(0, 4) : undefined

    const astroEvents = [
        {
            date: '2021-12-11',
            objects: [
                'IC_1396', 'IC_434'
            ],
            total: {
                exposure: 600,
                frames: 10
            }
        },
        {
            date: '2021-12-24',
            objects: [
                'IC_1396', 'IC_434', 'M 1'
            ],
            total: {
                exposure: 823,
                frames: 23
            }
        }
    ]

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
            <br />
            <Calendar
                eventsWeather={(weatherData?.payload ? weatherData?.payload : [])}
                eventsTelescope={astroEvents}
            />
        </>
    )
}

export default Main
