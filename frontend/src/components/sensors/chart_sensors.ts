import colors from '../chart/colors'

const chart_sensors = {
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
    xAxis: [{
        type: 'datetime',
        dateTimeLabelFormats: {
            month: '%e %b, %Y',
            year: '%b'
        },
        gridLineWidth: 1
    }],
    yAxis: [{
        labels: {
            format: '{value}°C',
            style: {
                color: colors[1]
            }
        },
        title: {
            text: '', // Температура
        },
        opposite: false,
    }, {
        gridLineWidth: 0,
        title: {
            text: '', // Влажность
        },
        labels: {
            format: '{value} %',
            style: {
                color: colors[9]
            }
        },
        opposite: true,
        min: 0,
        max: 90,
    }],
    series: [{
        name: 'Влажность',
        type: 'area',
        yAxis: 1,
        data: [],
        color: colors[9],
        tooltip: {
            valueSuffix: ' %'
        }
    }, {
        name: 'Температура',
        type: 'spline',
        yAxis: 0,
        data: [],
        color: colors[1],
        tooltip: {
            valueSuffix: ' °C'
        }
    }, {
        name: 'Температура 1',
        type: 'spline',
        yAxis: 0,
        data: [],
        color: colors[2],
        tooltip: {
            valueSuffix: ' °C'
        }
    }, {
        name: 'Температура 2',
        type: 'spline',
        yAxis: 0,
        data: [],
        color: colors[3],
        tooltip: {
            valueSuffix: ' °C'
        }
    }, {
        name: 'Температура 3',
        type: 'spline',
        yAxis: 0,
        data: [],
        color: colors[4],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]
}

export default chart_sensors