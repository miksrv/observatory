import React from 'react'
import { Container } from 'semantic-ui-react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import chart_config from '../data/chart_config'

Highcharts.setOptions(Highcharts.theme = chart_config);

const Charts = (props) => {
    let chart1_Options = {
        xAxis: [{
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e %b, %Y',
                year: '%b'
            },
            //tickInterval: 3600 * 1000 * 2,
            gridLineWidth: 1
        }],
        yAxis: [{
            labels: {
                style: {
                    color: Highcharts.theme.colors[3]
                }
            },
            title: {
                text: 'Количество кадров',
                style: {
                    color: Highcharts.theme.colors[3]
                }
            },
            opposite: false,
        }, {
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
            opposite: true,
        }],
        series: [{
            name: 'Количество кадров',
            type: 'column',
            data: props.data.chart.frame,
            color: Highcharts.theme.colors[3],
            tooltip: {
                valueSuffix: ''
            }
        }, {
            name: 'Выдержка',
            type: 'spline',
            yAxis: 1,
            color: Highcharts.theme.colors[0],
            data: props.data.chart.exp,
            tooltip: {
                valueSuffix: ' мин'
            },
        }]
    }

    return (
        <Container>
            <HighchartsReact
                highcharts={Highcharts}
                options={chart1_Options}
            />
        </Container>
    )
}

export default Charts