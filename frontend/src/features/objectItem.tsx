import React from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetObjectItemQuery, useGetObjectFilesQuery,
    useGetCatalogItemQuery, useGetPhotoListItemQuery,
    useGetObjectNamesQuery
} from '../app/observatoryApi'
import { Grid } from 'semantic-ui-react'
import ObjectItemHeader from '../components/objectItemHeader'
import PhotoTable from '../components/photoTable'
import FilesTable from '../components/filesTable'
import Chart from '../components/chart'
import ObjectCloud from '../components/objectCloud'

import chart_coordinates from '../components/chart/chart_coordinates'
import chart_coordlines from '../components/chart/chart_coordlines'

type TParamsURL = {
    name: string
}

const ObjectItem: React.FC = () => {
    const params: TParamsURL = useParams()
    const { data: dataObject, isFetching: objectLoading, isError } = useGetObjectItemQuery(params.name)
    const { data: dataCatalog, isFetching: catalogLoading } = useGetCatalogItemQuery(params.name)
    const { data: dataPhotos } = useGetPhotoListItemQuery(params.name)
    const { data: dataFiles, isFetching: fileLoading } = useGetObjectFilesQuery(params.name)
    const { data: dataNames, isFetching: namesLoading } = useGetObjectNamesQuery()

    const chartData: any[] = []
    const chartRa: any[] = []
    const chartDec: any[] = []

    let deviationRa: number = 0;
    let deviationDec: number = 0;

    if (isError) {
        return <div>Возникла ошибка на сервер</div>
    }

    if (dataObject?.status === false || dataCatalog?.status === false) {
        return <div>Что-то пошло не так, такого объекта нет</div>
    }

    if (dataFiles?.payload) {
        let middleRa = 0
        let middleDec = 0
        let counter = 0

        dataFiles.payload.forEach((item) => {
            middleRa += item.ra
            middleDec += item.dec
            counter += 1

            chartData.push([item.ra, item.dec])
            chartRa.push(item.ra)
            chartDec.push(item.dec)
        })

        deviationRa = Math.max(...chartRa) - Math.min(...chartRa)
        deviationDec = Math.max(...chartDec) - Math.min(...chartDec)

        chart_coordinates.xAxis.plotLines[0].value = middleRa / counter
        chart_coordinates.yAxis.plotLines[0].value = middleDec / counter
    }

    return (
        <>
            <ObjectItemHeader
                name={params.name}
                loader={objectLoading || catalogLoading}
                catalog={dataCatalog?.payload}
                object={dataObject?.payload}
                deviationRa={Math.round(deviationRa * 100) / 100}
                deviationDec={Math.round(deviationDec * 100) / 100}
            />
            {(dataPhotos?.payload && !objectLoading) &&
                <>
                    <br />
                    <PhotoTable photos={dataPhotos?.payload} />
                </>
            }
            <br />
            <Grid>
                <Grid.Column computer={6} tablet={16} mobile={16}>
                    <Chart
                        loader={fileLoading}
                        config={chart_coordinates}
                        data={[chartData]}
                    />
                </Grid.Column>
                <Grid.Column computer={10} tablet={16} mobile={16}>
                    <Chart
                        loader={fileLoading}
                        config={chart_coordlines}
                        data={[chartRa, chartDec]}
                    />
                </Grid.Column>
            </Grid>
            <br />
            <FilesTable
                loader={fileLoading}
                files={dataFiles?.payload}
            />
            <br />
            <ObjectCloud
                loader={namesLoading}
                current={params.name}
                names={dataNames?.payload}
                link='object'
            />
        </>
    )
}

export default ObjectItem
