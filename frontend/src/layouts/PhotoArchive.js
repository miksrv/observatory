import React from 'react'
import { Image, Dimmer, Loader, Table } from 'semantic-ui-react'
import { getTimeFromSec } from '../data/functions'
import lang from '../locale/detect'

import _ from 'lodash'
import moment from "moment";

const renderTableCell = (item, filter) => {
    return <Table.Cell className={(item.shot > 0) ? `filter-${filter}` : ''}>
        {getTimeFromSec(item.exp)} ({item.shot})
    </Table.Cell>
}

const PhotoArchive = params => {
    return (
        ! _.isEmpty(params.photos) ? (
        <div className='card photos-archive'>
            <Table celled inverted selectable compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='one'>Фото</Table.HeaderCell>
                        <Table.HeaderCell>Дата</Table.HeaderCell>
                        <Table.HeaderCell>Кадров</Table.HeaderCell>
                        <Table.HeaderCell>Выдержка</Table.HeaderCell>
                        <Table.HeaderCell>L</Table.HeaderCell>
                        <Table.HeaderCell>R</Table.HeaderCell>
                        <Table.HeaderCell>G</Table.HeaderCell>
                        <Table.HeaderCell>B</Table.HeaderCell>
                        <Table.HeaderCell>H</Table.HeaderCell>
                        <Table.HeaderCell>O</Table.HeaderCell>
                        <Table.HeaderCell>S</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {params.photos.map((item, key) => (
                        <Table.Row key={key}>
                            <Table.Cell textAlign='center'>
                                <Image
                                    size='tiny'
                                    src={process.env.REACT_APP_PHOTOS + item.file + '_thumb.jpg'}
                                    onClick={() => params.lightbox(item.file)}
                                />
                            </Table.Cell>
                            <Table.Cell>{moment(item.date).format('DD.MM.YYYY')}</Table.Cell>
                            <Table.Cell>{item.statistic.shot}</Table.Cell>
                            <Table.Cell>{getTimeFromSec(item.statistic.exp, true)}</Table.Cell>
                            {renderTableCell(item.statistic.filters.Luminance, 'l')}
                            {renderTableCell(item.statistic.filters.Red, 'r')}
                            {renderTableCell(item.statistic.filters.Green, 'g')}
                            {renderTableCell(item.statistic.filters.Blue, 'b')}
                            {renderTableCell(item.statistic.filters.Ha, 'h')}
                            {renderTableCell(item.statistic.filters.OIII, 'o')}
                            {renderTableCell(item.statistic.filters.SII, 's')}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
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