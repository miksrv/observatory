import Highcharts from 'highcharts'

const voltage = {
    chart: {
        height: 305,
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
            format: '{value} Вт',
            style: {
                color: Highcharts.theme.colors[0]
            }
        },
        title: {
            text: '', // Потребляемая мощность
            style: {
                color: Highcharts.theme.colors[0]
            }
        },
        opposite: false,
        min: 0,
        max: 12
    }],
    series: [{
        name: 'HEQ5 Pro',
        type: 'spline',
        // data: data.temp1,
        color: Highcharts.theme.colors[0],
        tooltip: {
            valueSuffix: ' Вт'
        }
    }, {
        name: 'ASI 1600mm',
        type: 'spline',
        color: Highcharts.theme.colors[1],
        tooltip: {
            valueSuffix: ' Вт'
        }
    }, {
        name: 'ZWO EAF',
        type: 'spline',
        color: Highcharts.theme.colors[2],
        tooltip: {
            valueSuffix: ' Вт'
        }
    }]
}

export default voltage