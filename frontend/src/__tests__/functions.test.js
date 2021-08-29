import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import * as functions from '../data/functions';

describe('Testing helper functions', function () {
    it('Check "declOfNum"', () => {
        const testArray = ['кадр', 'кадра', 'кадров']

        expect(functions.declOfNum(23, testArray)).toBe('кадра');
        expect(functions.declOfNum(21, testArray)).toBe('кадр');
        expect(functions.declOfNum(28, testArray)).toBe('кадров');
    })

    it('Check "setClassByFilter" - mapping string to string', () => {
        let filters = [
            {k: 'Red', v: 'filter-r'},
            {k: 'Green', v: 'filter-g'},
            {k: 'Blue', v: 'filter-b'},
            {k: 'Luminance', v: 'filter-l'},
            {k: 'Ha', v: 'filter-h'},
            {k: 'SII', v: 'filter-s'},
            {k: 'OIII', v: 'filter-o'},
            {k: '', v: ''},
        ]

        filters.forEach((item) => {
            expect(functions.setClassByFilter(item.k)).toBe(item.v);
        })
    })

    it('Check "getTimeFromSec" - convert input number secund to string hour:mins', () => {
        expect(functions.getTimeFromSec(3600)).toBe('01:00')
        expect(functions.getTimeFromSec(51365)).toBe('14:16')
        expect(functions.getTimeFromSec(51365, true)).toBe('14 часов 16 минут')
        expect(functions.getTimeFromSec(-10)).toBe('')
    })

    it('Check "timeAgo" - covert input number second to string time ago', () => {
        expect(functions.timeAgo(null)).toBe('')
        expect(functions.timeAgo(-10)).toBe('')
        expect(functions.timeAgo(5320)).toBe(', 01 ч. 28 мин. 40 сек. назад')
    })

    it('Check "filterLabel"', () => {
        expect(functions.filterLabel(0, 10, 'test')).toBe('')
    })

    it('Check "shuffle"', () => {
        const testArray = [1, 2, 3, 4, 5]

        expect(functions.shuffle(testArray).length).toBe(5)
    })
});
