import colors from '../chart/colors'

const chart_sensors = {
    chart: {
        marginTop: 15,
        marginBottom: 70,
        height: 264
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    legend: {
        floating: false,
        layout: 'horizontal',
        verticalAlign: 'bottom',
        x: 0,
        y: 5,
        width: '100%',
        align: 'center',
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
        name: 'БП',
        type: 'spline',
        yAxis: 0,
        color: colors[2],
        tooltip: {
            valueSuffix: ' °C'
        }
    }, {
        name: 'Серверная',
        type: 'spline',
        yAxis: 0,
        color: colors[3],
        tooltip: {
            valueSuffix: ' °C'
        }
    }, {
        name: 'Апертура',
        type: 'spline',
        yAxis: 0,
        color: colors[4],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]
}

export default chart_sensors