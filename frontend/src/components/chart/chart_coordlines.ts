import colors from './colors'

const chart_coordlines = {
    chart: {
        height: 300,
        marginBottom: 30,
        marginTop: 15
    },
    legend: {
        enabled: true
    },
    series: [
        {
            color: colors[6],
            name: 'RA',
            tooltip: {
                valueSuffix: ' °'
            },
            yAxis: 0
        },
        {
            color: colors[9],
            name: 'DEC',
            tooltip: {
                valueSuffix: ' °'
            },
            yAxis: 1
        }
    ],
    subtitle: {
        text: ''
    },
    title: {
        text: ''
    },
    tooltip: {
        headerFormat: '<b>Координаты объекта</b><br>'
    },
    xAxis: {
        gridLineWidth: 1,
        title: {
            text: ''
        }
    },
    yAxis: [
        {
            labels: {
                style: {
                    color: colors[6]
                }
            },
            opposite: true,
            title: {
                text: ''
            }
        },
        {
            labels: {
                style: {
                    color: colors[9]
                }
            },
            opposite: false,
            title: {
                text: ''
            }
        }
    ]
}

export default chart_coordlines
