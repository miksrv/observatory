import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader, Grid } from 'semantic-ui-react'

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

import MainContainer from '../components/MainContainer'

import Dashboard from '../layouts/Dashboard'

import Statistic from '../informers/Statistic'
import Camera from '../informers/Camera'
import ExpChart from '../informers/ExpChart'
import Sun from '../informers/Sun'
import Moon from '../informers/Moon'

import * as observatoryActions from '../store/observatory/actions'

import _ from 'lodash'

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getAstroData())
        dispatch(observatoryActions.fetchData())
        dispatch(observatoryActions.fetchGraphData())
    }

    render() {
        const { statistic, graphic, astroData } = this.props

        // const localizer = momentLocalizer(moment)

        return (
            <MainContainer>
                { ( ! _.isEmpty(statistic) && ! _.isEmpty(graphic) && ! _.isEmpty(astroData))  ? (
                    <Container>
                        <Grid>
                            <Statistic data={statistic} />
                            <Camera />
                            <ExpChart data={graphic} />
                            <Sun data={astroData.sun} />
                            <Moon data={astroData.moon} />
                        </Grid>
                        {/*<Grid>*/}
                        {/*    <Grid.Column computer={16} tablet={16} mobile={16}>*/}
                        {/*        <div className='informer container'>*/}
                        {/*            <Calendar*/}
                        {/*                localizer={localizer}*/}
                        {/*                events={[]}*/}
                        {/*                startAccessor="start"*/}
                        {/*                endAccessor="end"*/}
                        {/*                style={{ height: 500 }}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </Grid.Column>*/}
                        {/*</Grid>*/}
                        <br />
                        <Dashboard
                            data={statistic}
                        />
                    </Container>
                ) : (
                    <Dimmer active>
                        <Loader>Загрузка</Loader>
                    </Dimmer>
                )}
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        astroData: state.observatory.astroData,
        statistic: state.observatory.statistic,
        graphic: state.observatory.graphic
    }
}

export default connect(mapStateToProps)(Main)