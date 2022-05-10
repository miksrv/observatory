import React, { useState, useEffect } from 'react'
import {
    useGetStatisticQuery, useGetPhotoListQuery,
    useGetWeatherMonthMutation, useGetFilesMonthMutation
} from '../../app/observatoryApi'
import { TPhoto, TCatalog } from '../../app/types'
import { shuffle } from '../../functions/helpers'
import moment, { Moment } from 'moment'

import Statistic from './statistic'
import PhotoGrid from '../../components/photoGrid'
import Calendar from '../../components/calendar'

const Index: React.FC = () => {
    const [ date, setDate ] = useState<Moment>(moment())
    const [ photos, setPhotos ] = useState<TPhoto[] & TCatalog[] | undefined>(undefined)
    const { data: statisticData, isLoading: statisticLoading } = useGetStatisticQuery()
    const { data: photoData, isLoading: photosLoading } = useGetPhotoListQuery()
    const [ getWeatherMonth, { data: weatherData, isLoading: weatherLoading } ] = useGetWeatherMonthMutation()
    const [ getFilesMonth, { data: filesData, isLoading: filesLoading } ] = useGetFilesMonthMutation()

    document.title = 'Главная страница - Обсерватория'

    if (photoData?.payload && photos === undefined) {
        const randomPhotos = shuffle(photoData.payload.slice()).slice(0, 4)

        setPhotos(randomPhotos);
    }

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
                photoList={photos}
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

export default Index
