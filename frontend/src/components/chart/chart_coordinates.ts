import colors from './colors'

const chart_coordinates = {
    chart: {
        height: 300,
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 12,
        type: 'scatter',
        zoomType: 'xy'
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 3,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: colors[4]
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} RA, {point.y} DEC'
            }
        }
    },
    series: [
        {
            color: colors[3],
            name: 'Координаты объекта'
        }
    ],
    subtitle: {
        text: ''
    },
    title: {
        text: ''
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            enabled: false
        },
        plotLines: [
            {
                color: colors[1],
                dashStyle: 'ShortDash',
                value: 0,
                width: 2,
                zIndex: 3
            }
        ],
        tickAmount: 10,
        tickColor: 'transparent',
        title: {
            text: ''
        }
    },
    yAxis: {
        gridLineWidth: 1,
        labels: {
            enabled: false
        },
        plotLines: [
            {
                color: colors[1],
                dashStyle: 'ShortDash',
                value: 0,
                width: 2,
                zIndex: 3
            }
        ],
        tickAmount: 10,
        tickColor: 'transparent',
        title: {
            text: ''
        }
    }
}

export default chart_coordinates
