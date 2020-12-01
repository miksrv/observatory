import React, { Component } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

import chart_config from '../data/chart_config'

HighchartsMore(Highcharts)

Highcharts.setOptions(Highcharts.theme = chart_config)

class TempGraphic extends Component {

  state = {
    chartTempHumd: {
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
          format: '{value}°C',
          style: {
            color: Highcharts.theme.colors[7]
          }
        },
        title: {
          text: '', // Температура
          style: {
            color: Highcharts.theme.colors[7]
          }
        },
        opposite: false,
      }, {
        gridLineWidth: 0,
        title: {
          text: '', // Влажность
          style: {
            color: Highcharts.theme.colors[6]
          }
        },
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.theme.colors[6]
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
        color: Highcharts.theme.colors[6],
        // data: data.humd,
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        name: 'Температура',
        type: 'spline',
        yAxis: 0,
        // data: data.temp1,
        color: Highcharts.theme.colors[7],
        tooltip: {
          valueSuffix: ' °C'
        }
      }, {
        name: 'AC/DC Блок питания',
        type: 'spline',
        yAxis: 0,
        // data: data.temp1,
        color: Highcharts.theme.colors[8],
        tooltip: {
          valueSuffix: ' °C'
        }
      }, {
        name: 'Серверный шкаф',
        type: 'spline',
        yAxis: 0,
        // data: data.temp1,
        color: Highcharts.theme.colors[9],
        tooltip: {
          valueSuffix: ' °C'
        }
      }, {
        name: 'Главное зеркало',
        type: 'spline',
        yAxis: 0,
        // data: data.temp1,
        color: Highcharts.theme.colors[0],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    }
  }

  componentDidMount() {
    this.handleUpdateCharts()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevProps.data) {
      this.handleUpdateCharts()
    }
  }

  handleUpdateCharts() {
    const { sensorStat } = this.props

    this.setState({
      chartTempHumd: {
        ...this.state.chartTempHumd,
        series: [
          { data: sensorStat.data.h },
          { data: sensorStat.data.t },
          { data: sensorStat.data.t1 },
          { data: sensorStat.data.t3 },
          { data: sensorStat.data.t2 }
        ]
      }
    })
  }

  render() {
    const { chartTempHumd } = this.state

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartTempHumd}
        />
    )
  }
}

export default TempGraphic