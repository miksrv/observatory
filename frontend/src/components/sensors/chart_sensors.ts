import colors from '../chart/colors'

const chart_sensors = {
    chart: {
        height: 264,
        marginBottom: 70,
        marginTop: 15
    },
    legend: {
        align: 'center',
        floating: false,
        layout: 'horizontal',
        verticalAlign: 'bottom',
        width: '100%',
        x: 0,
        y: 5
    },
    series: [
        {
            color: colors[9],
            data: [],
            name: 'Влажность',
            tooltip: {
                valueSuffix: ' %'
            },
            type: 'area',
            yAxis: 1
        },
        {
            color: colors[1],
            data: [],
            name: 'Температура',
            tooltip: {
                valueSuffix: ' °C'
            },
            type: 'spline',
            yAxis: 0
        },
        {
            color: colors[2],
            name: 'БП',
            tooltip: {
                valueSuffix: ' °C'
            },
            type: 'spline',
            yAxis: 0
        },
        {
            color: colors[3],
            name: 'Серверная',
            tooltip: {
                valueSuffix: ' °C'
            },
            type: 'spline',
            yAxis: 0
        },
        {
            color: colors[4],
            name: 'Апертура',
            tooltip: {
                valueSuffix: ' °C'
            },
            type: 'spline',
            yAxis: 0
        }
    ],
    subtitle: {
        text: ''
    },
    title: {
        text: ''
    },
    xAxis: [
        {
            dateTimeLabelFormats: {
                month: '%e %b, %Y',
                year: '%b'
            },
            gridLineWidth: 1,
            type: 'datetime'
        }
    ],
    yAxis: [
        {
            labels: {
                format: '{value}°C',
                style: {
                    color: colors[1]
                }
            },
            opposite: false,
            title: {
                text: '' // Температура
            }
        },
        {
            gridLineWidth: 0,
            labels: {
                format: '{value} %',
                style: {
                    color: colors[9]
                }
            },
            max: 90,
            min: 0,
            opposite: true,
            title: {
                text: '' // Влажность
            }
        }
    ]
}

export default chart_sensors
