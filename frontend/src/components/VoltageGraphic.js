import React, { Component } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

import chart_config from '../data/chart_config'

HighchartsMore(Highcharts)

Highcharts.setOptions(Highcharts.theme = chart_config)

class VoltageGraphic extends Component {

  state = {
    chartTempVolt: {
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
      chartTempVolt: {
        ...this.state.chartTempVolt,
        series: [
          { data: sensorStat.data.p1 },
          { data: sensorStat.data.p2 },
          { data: sensorStat.data.p3 }
        ]
      }
    })
  }

  render() {
    const { chartTempVolt } = this.state

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartTempVolt}
        />
    )
  }
}

export default VoltageGraphic