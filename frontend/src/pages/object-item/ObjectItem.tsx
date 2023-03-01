import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Message } from 'semantic-ui-react'

import {
    useGetCatalogItemQuery,
    useGetObjectFilesQuery,
    useGetObjectItemQuery,
    useGetObjectNamesQuery,
    useGetPhotoListItemQuery
} from 'app/observatoryApi'

import { isOutdated } from 'functions/helpers'

import Chart from 'components/chart/Chart'
import chart_coordinates from 'components/chart/chart_coordinates'
import chart_coordlines from 'components/chart/chart_coordlines'
import chart_statistic from 'components/chart/chart_statistic'
import FilesTable from 'components/files-table/FilesTable'
import ObjectCloud from 'components/object-cloud/ObjectCloud'
import PhotoTable from 'components/photo-table/PhotoTable'

import ObjectItemHeader from './ObjectItemHeader'

type TParamsURL = {
    name: string
}

const ObjectItem: React.FC = () => {
    const params: TParamsURL = useParams()
    const {
        data: dataObject,
        isFetching: objectLoading,
        isError
    } = useGetObjectItemQuery(params.name)
    const { data: dataCatalog, isFetching: catalogLoading } =
        useGetCatalogItemQuery(params.name)
    const { data: dataPhotos } = useGetPhotoListItemQuery(params.name)
    const { data: dataFiles, isFetching: fileLoading } = useGetObjectFilesQuery(
        params.name
    )
    const { data: dataNames, isFetching: namesLoading } =
        useGetObjectNamesQuery()

    const title =
        dataCatalog && dataCatalog?.payload.title
            ? dataCatalog?.payload.title
            : params.name

    const chartData: [number, number][] = []
    const chartRa: number[] = []
    const chartDec: number[] = []
    const chartHFR: number[] = []
    const chartSNR: number[] = []

    let deviationRa: number = 0
    let deviationDec: number = 0

    document.title = `${title} - Обсерватория`

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

            if (item.hfr !== 0) {
                chartHFR.push(item.hfr)
            }

            if (item.sky !== 0) {
                chartSNR.push(item.sky)
            }
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
            {isOutdated(
                dataPhotos?.payload?.[0].date!,
                dataObject?.payload.date!
            ) ? (
                <Message
                    warning
                    icon='warning sign'
                    header='Новые данные'
                    content='Фотографии устарели - есть новые данные с телескопа, с помощью которых можно собрать новое изображение объекта'
                />
            ) : (
                <br />
            )}
            {dataPhotos?.payload && !objectLoading && (
                <>
                    <PhotoTable photos={dataPhotos?.payload} />
                </>
            )}
            <br />
            <Grid>
                <Grid.Column
                    computer={6}
                    tablet={16}
                    mobile={16}
                >
                    <Chart
                        loader={fileLoading}
                        config={chart_coordinates}
                        data={[chartData]}
                    />
                </Grid.Column>
                <Grid.Column
                    computer={10}
                    tablet={16}
                    mobile={16}
                >
                    <Chart
                        loader={fileLoading}
                        config={chart_coordlines}
                        data={[chartRa, chartDec]}
                    />
                </Grid.Column>
                {chartHFR.length && chartSNR.length ? (
                    <Grid.Column width={16}>
                        <Chart
                            loader={fileLoading}
                            config={chart_statistic}
                            data={[chartHFR, chartSNR]}
                        />
                    </Grid.Column>
                ) : (
                    ''
                )}
            </Grid>
            <br />
            <FilesTable
                loader={fileLoading}
                object={params.name}
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
