import React from 'react'
import { Image, Grid, Dimmer, Loader } from 'semantic-ui-react'

import FilterList from './FilterList'
import lang from '../locale/detect'

import _ from 'lodash'
import moment from "moment";
import {getTimeFromSec} from "../data/functions";
import {Link} from "react-router-dom";


const PHOTO_URL = 'https://api.miksoft.pro/astro/'

const PhotoArchive = params => {
    return (
        ! _.isEmpty(params.photos) ? (
        <div className='card photos-archive'>
            {params.photos.map((item, key) => (
                <Grid>
                    <Grid.Column computer={3} tablet={8} mobile={16}>
                        <Image
                            size='small'
                            className='border'
                            src={PHOTO_URL + item.file + '_thumb.jpg'}
                        />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <div><span className='second-color'>Дата обработки:</span> {moment(item.date).format('DD.MM.YYYY')}</div>
                        <div><span className='second-color'>Общая выдержка:</span> {getTimeFromSec(item.statistic.exp, true)}</div>
                        <div><span className='second-color'>Количество кадров:</span> {item.statistic.shot}</div>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <FilterList data={item.statistic} />
                    </Grid.Column>
                </Grid>
            ))}
        </div>
        ) : (
            <div className='photos-list card loader'>
                <Dimmer active>
                    <Loader>{lang.general.loading}</Loader>
                </Dimmer>
            </div>
        )
    )
}

export default PhotoArchive