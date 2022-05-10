import colors from './colors'

const chart_statistic = {
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
                color: colors[1]
            }
        },
        opposite: true,
    }, {
        title: {
            text: ''
        },
        labels: {
            style: {
                color: colors[4]
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
        name: 'HFR',
        color: colors[1],
    }, {
        yAxis: 1,
        name: 'SNR',
        color: colors[4],
    }],
    tooltip: {
        headerFormat: '<b>Статистика съемки</b><br>'
    }
}

export default chart_statistic