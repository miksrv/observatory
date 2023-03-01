import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'

import {
    useGetFilesMonthMutation,
    useGetPhotoListQuery,
    useGetStatisticQuery,
    useGetWeatherMonthMutation
} from 'app/observatoryApi'
import { TCatalog, TPhoto } from 'app/types'

import { shuffle } from 'functions/helpers'

import Calendar from 'components/calendar/Calendar'
import PhotoGrid from 'components/photo-grid/PhotoGrid'

import Statistic from './statistic'

const Main: React.FC = () => {
    const [date, setDate] = useState<Moment>(moment())
    const [photos, setPhotos] = useState<(TPhoto[] & TCatalog[]) | undefined>(
        undefined
    )
    const { data: statisticData, isLoading: statisticLoading } =
        useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()
    const [getWeatherMonth, { data: weatherData, isLoading: weatherLoading }] =
        useGetWeatherMonthMutation()
    const [getFilesMonth, { data: filesData, isLoading: filesLoading }] =
        useGetFilesMonthMutation()

    if (photoData?.payload && photos === undefined) {
        const randomPhotos = shuffle(photoData.payload.slice()).slice(0, 4)

        setPhotos(randomPhotos)
    }

    useEffect(() => {
        document.title = 'Главная страница - Обсерватория'
    })

    useEffect(() => {
        const getWeather = async () => {
            try {
                const monthYear = moment(date).format('Y-MM')
                await getWeatherMonth(monthYear).unwrap()
                await getFilesMonth(monthYear).unwrap()
            } catch (error) {
                console.error(error)

                return null
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
                photoList={photos}
                className='photoRow-4'
            />
            <br />
            <Calendar
                loading={weatherLoading || filesLoading}
                eventsWeather={
                    weatherData?.payload ? weatherData?.payload.weather : []
                }
                eventsTelescope={filesData?.payload ? filesData.payload : []}
                changeDate={(date) => setDate(date)}
            />
        </>
    )
}

export default Main
