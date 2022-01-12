import React, { useState, useEffect } from 'react'
import { useGetStatisticQuery, useGetPhotoListQuery, useGetWeatherMonthMutation, useGetFilesMonthMutation } from '../app/observatoryApi'
import { shuffle } from '../functions/helpers'
import moment, { Moment } from 'moment'

import Statistic from '../components/statistic'
import PhotoGrid from '../components/photoGrid'
import Calendar from '../components/calendar'

const Main: React.FC = () => {
    const [ date, setDate ] = useState<Moment>(moment())
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()
    const [ getWeatherMonth, { data: weatherData, isLoading: weatherLoading } ] = useGetWeatherMonthMutation()
    const [ getFilesMonth, { data: filesData, isLoading: filesLoading } ] = useGetFilesMonthMutation()

    const randomPhotos = photoData?.payload ? shuffle(photoData.payload.slice()).slice(0, 4) : undefined

    document.title = 'Главная страница - Обсерватория'

    useEffect(() => {
        const getWeather = async () => {
            try {
                const monthYear = moment(date).format('Y-MM')
                await getWeatherMonth(monthYear).unwrap()
                await getFilesMonth(monthYear).unwrap()
            } catch (error) {

            }
        }

        getWeather().finally()
    }, [getWeatherMonth, getFilesMonth, date])

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
                loading={weatherLoading || filesLoading}
                eventsWeather={(weatherData?.payload ? weatherData?.payload.weather : [])}
                eventsTelescope={(filesData?.payload ? filesData.payload : [])}
                changeDate={(date) => setDate(date)}
            />
        </>
    )
}

export default Main
