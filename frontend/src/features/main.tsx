import React, { useState, useEffect } from 'react'
import { useGetStatisticQuery, useGetPhotoListQuery, useGetWeatherMonthMutation } from '../app/observatoryApi'
import { shuffle } from '../functions/helpers'
import moment, { Moment } from 'moment'

import Statistic from '../components/statistic'
import PhotoGrid from '../components/photoGrid'
import Calendar from '../components/calendar'

const Main: React.FC = () => {
    const [ date, setDate ] = useState<Moment>(moment())
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()
    const [ getWeatherMonth, { data: weatherData } ] = useGetWeatherMonthMutation()

    const randomPhotos = photoData?.payload ? shuffle(photoData.payload.slice()).slice(0, 4) : undefined

    useEffect(() => {
        const getWeather = async () => {
            try {
                const monthYear = moment(date).format('Y-M')
                await getWeatherMonth(monthYear).unwrap()
            } catch (error) {

            }
        }

        getWeather().finally()
    }, [getWeatherMonth, date])

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
                eventsWeather={(weatherData?.payload ? weatherData?.payload.weather : [])}
                eventsTelescope={astroEvents}
                changeDate={(date) => setDate(date)}
            />
        </>
    )
}

export default Main
