import Highcharts from 'highcharts'
import chart_config from './chart_config'

Highcharts.setOptions(Highcharts.theme = chart_config)

const chart_monthfitstat = {
    chart: {
        height: 250
    },
    tooltip: {
        xDateFormat: '%b %Y'
    },
    xAxis: {
        type: 'datetime',
        gridLineWidth: 1
    },
    plotOptions: {
        column: {
            pointPadding: 0.1,
            borderWidth: 0
        }
    },
    yAxis: [
        {
            title: {
                text: '', // Выдержка
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.theme.colors[0]
                }
            },
            opposite: false
        },
        {
            title: {
                text: '', // Выдержка
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.theme.colors[2]
                }
            },
            opposite: true
        },
        {
            title: {
                text: '', // Выдержка
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.theme.colors[5]
                }
            },
            opposite: true
        }
    ],
    series: [
        {
            name: 'Выдержка',
            type: 'column',
            yAxis: 0,
            color: Highcharts.theme.colors[0],
            tooltip: {
                valueSuffix: ' час.'
            },
        },
        {
            name: 'Кадров',
            type: 'line',
            yAxis: 1,
            color: Highcharts.theme.colors[2],
            tooltip: {
                valueSuffix: ''
            },
        },
        {
            name: 'Объектов',
            type: 'line',
            yAxis: 2,
            color: Highcharts.theme.colors[5],
            tooltip: {
                valueSuffix: ''
            },
        }
    ]
}

export default chart_monthfitstat