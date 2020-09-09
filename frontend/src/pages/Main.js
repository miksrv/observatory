import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Dimmer, Loader} from 'semantic-ui-react'

import Header from '../components/Header'
import Dashboard from '../layouts/Dashboard'
import Charts from '../layouts/Charts'

import * as observatoryActions from '../store/observatory/actions'
import getTimeFromSec from '../data/functions'

import 'moment/locale/ru'
import moment from "moment";

import _ from 'lodash'

class Main extends Component {

    state = {

    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.fetchData())
        dispatch(observatoryActions.fetchGraphData())
    }

    render() {
        const { statistic, graphic } = this.props

        return (
            <div>
                <Header/>
                { ( ! _.isEmpty(statistic) && ! _.isEmpty(graphic))  ? (
                    <div>
                        <br />
                        <Container>
                            <div>Всего кадров: <b>{statistic.frames}</b></div>
                            <div>Всего объектов: <b>{statistic.objects}</b></div>
                            <div>Общая выдержка: <b>{getTimeFromSec(statistic.exposure)}</b></div>
                            <br />
                            <img src={"http://astro.myftp.org:8002/jpg/1/image.jpg"} />
                        </Container>
                        <br />
                        <Charts
                            data={graphic}
                        />
                        <br />
                        <Dashboard
                            data={statistic}
                        />
                    </div>
                ) : (
                    <Dimmer active>
                        <Loader>Загрузка</Loader>
                    </Dimmer>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statistic: state.observatory.statistic,
        graphic: state.observatory.graphic
    }
}

export default connect(mapStateToProps)(Main)