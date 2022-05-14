import colors from './colors'

const chart_coordlines = {
    chart: {
        marginTop: 15,
        marginBottom: 30,
        height: 300
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        gridLineWidth: 1,
        title: {
            text: ''
        },
    },
    yAxis: [{
        title: {
            text: ''
        },
        labels: {
            style: {
                color: colors[6]
            }
        },
        opposite: true,
    }, {
        title: {
            text: ''
        },
        labels: {
            style: {
                color: colors[9]
            }
        },
        opposite: false,
    }
    ],
    legend: {
        enabled: true
    },
    series: [{
        yAxis: 0,
        name: 'RA',
        color: colors[6],
        tooltip: {
            valueSuffix: ' °'
        }
    }, {
        yAxis: 1,
        name: 'DEC',
        color: colors[9],
        tooltip: {
            valueSuffix: ' °'
        }
    }],
    tooltip: {
        headerFormat: '<b>Координаты объекта</b><br>'
    }
}

export default chart_coordlines