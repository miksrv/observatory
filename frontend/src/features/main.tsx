import React from 'react'
import { useGetStatisticQuery, useGetPhotoListQuery } from '../app/observatoryApi'
import { shuffle } from '../functions/helpers'

import Statistic from '../components/statistic'
import PhotoGrid from '../components/photoGrid'
import Calendar from '../components/calendar'

const Main: React.FC = () => {
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()

    const randomPhotos = photoData?.payload ? shuffle(photoData.payload.slice()).slice(0, 4) : undefined

    const eventWeather = [
        {
            date: '2021-12-20',
            clouds: 56,
            temp: -7,
            rain: 1,
            wind: 5.2
        },
        {
            date: '2021-12-21',
            clouds: 23,
            temp: -11,
            rain: 0,
            wind: 3.2
        },
        {
            date: '2021-12-22',
            clouds: 36,
            temp: -5,
            rain: 0,
            wind: 2.0
        },
        {
            date: '2021-12-23',
            clouds: 37,
            temp: -4,
            rain: 0,
            wind: 1.7
        },
        {
            date: '2021-12-24',
            clouds: 12,
            temp: -10,
            rain: 0,
            wind: 3.6
        },
        {
            date: '2021-12-25',
            clouds: 85,
            temp: -5,
            rain: 0,
            wind: 5.7
        }
    ]
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
                eventsWeather={eventWeather}
                eventsTelescope={astroEvents}
            />
        </>
    )
}

export default Main
