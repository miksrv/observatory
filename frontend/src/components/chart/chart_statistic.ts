import colors from './colors'

const chart_statistic = {
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
            color: colors[1],
            name: 'HFR',
            yAxis: 0
        },
        {
            color: colors[4],
            name: 'SNR',
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
        headerFormat: '<b>Статистика съемки</b><br>'
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
                    color: colors[1]
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
                    color: colors[4]
                }
            },
            opposite: false,
            title: {
                text: ''
            }
        }
    ]
}

export default chart_statistic
