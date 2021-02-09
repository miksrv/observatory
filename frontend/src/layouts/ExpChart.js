import React from 'react'
import { Grid } from 'semantic-ui-react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import chart_config from '../data/chart_config'

Highcharts.setOptions(Highcharts.theme = chart_config)

const ExpChart = (props) => {
    const { data } = props

    let ExposureChart = {
        chart: {
            height: 233
        },
        tooltip: {
            xDateFormat: '%A, %d %B %Y'
        },
        xAxis: [{
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e %b, %Y',
                year: '%b'
            },
            gridLineWidth: 1
        }],
        yAxis: [
            {
                title: {
                    text: 'Выдержка',
                    style: {
                        color: Highcharts.theme.colors[0]
                    }
                },
                labels: {
                    format: '{value} мин',
                    style: {
                        color: Highcharts.theme.colors[0]
                    }
                },
            }],
        series: [
            {
                name: 'Выдержка',
                type: 'column',
                yAxis: 0,
                color: Highcharts.theme.colors[0],
                data: data.chart.exp,
                tooltip: {
                    valueSuffix: ' мин'
                },
            }]
    }

    return (
        <Grid.Column computer={10} tablet={16} mobile={16}>
            <div className='informer container'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ExposureChart}
                />
            </div>
        </Grid.Column>
    )
}

export default ExpChart