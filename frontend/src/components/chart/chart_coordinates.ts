import colors from './colors'

const chart_coordinates = {
    chart: {
        type: 'scatter',
        zoomType: 'xy',
        marginTop: 12,
        marginLeft: 10,
        marginBottom: 10,
        height: 300
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        title: {
            text: ''
        },
        tickColor: 'transparent',
        tickAmount: 10,
        gridLineWidth: 1,
        plotLines: [{
            color: colors[1],
            dashStyle: 'ShortDash',
            width: 2,
            value: 0,
            zIndex: 3
        }],
        labels: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        tickColor: 'transparent',
        tickAmount: 10,
        gridLineWidth: 1,
        plotLines: [{
            color: colors[1],
            dashStyle: 'ShortDash',
            width: 2,
            value: 0,
            zIndex: 3
        }],
        labels: {
            enabled: false
        }
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
    series: [{
        name: 'Координаты объекта',
        color: colors[3],
    }]
}

export default chart_coordinates