import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react' // , Dimmer, Loader, Grid

import moment from 'moment'

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

import MainContainer from '../components/MainContainer'
import FullTable from '../layouts/FullTable'
import Statistic from '../informers/Statistic'
// import ExpChart from '../informers/ExpChart'
// import Sun from '../informers/Sun'
// import Moon from '../informers/Moon'

// Calendar: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/date-navigation/

import * as observatoryActions from '../store/observatory/actions'

import _ from 'lodash'

class Main extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(observatoryActions.getFITStat())
        // dispatch(observatoryActions.fetchGraphData())
    }

    updateData = () => {}

    render() {
        const { FITStat } = this.props // graphic

        // const localizer = momentLocalizer(moment)

        return (
            <MainContainer
                updateTime={moment().unix()}
                onUpdateData={this.updateData}
            >
                <Container>
                    <Statistic data={FITStat} />
                    { ! _.isEmpty(FITStat) && (
                        <FullTable
                            data={FITStat}
                        />
                    )}
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
                </Container>

                        {/*<Grid>*/}
                        {/*    <ExpChart data={graphic} />*/}
                        {/*    <Sun data={astroData.sun} />*/}
                        {/*    <Moon data={astroData.moon} />*/}
                        {/*</Grid>*/}
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        FITStat: state.observatory.FITStat,
        // graphic: state.observatory.graphic,
    }
}

export default connect(mapStateToProps)(Main)