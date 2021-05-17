import React from 'react'

export const declOfNum = (number, words) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]
}

export const getTimeFromSec = (sec, full = false) => {
    if (sec <= 0)
        return ''

    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

    if (full)
        return `${h} ${declOfNum(h, ['час', 'часа', 'часов'])} ${m} ${declOfNum(m, ['минута', 'минуты', 'минут'])}`

    return (h < 10 ? "0" + h : h) + ':' + ( m < 10 ? "0" + m : m)
}

export const setClassByFilter = filter => {
    switch (filter) {
        case 'Red'       : return 'filter-r'
        case 'Green'     : return 'filter-g'
        case 'Blue'      : return 'filter-b'
        case 'Luminance' : return 'filter-l'
        case 'Ha'        : return 'filter-h'
        case 'SII'       : return 'filter-s'
        case 'OIII'      : return 'filter-o'

        default : return ''
    }
}

export const timeAgo = sec => {
    if (sec === null || sec <= 0)
        return ''

    let h = sec/3600 ^ 0
    let m = (sec-h*3600)/60 ^ 0
    let s = sec-h*3600-m*60
    return ', ' + ((h > 0 ? (h < 10 ? '0' + h : h) + ' ч. ' : '')
        + (m > 0 ? (m < 10 ? '0' + m : m) + ' мин. ' : '')
        + (s > 0 ? (s < 10 ? '0' + s : s) + ' сек.' : '')) + ' назад'
}

export const filterLabel = (sec, shot = 0, name) => {
    if (sec === 0) return ''

    const min = Math.round(sec / 60)

    return <li><span className={'filter ' + setClassByFilter(name)}>{name}</span> {min} {declOfNum(min, ['минута', 'минуты', 'минут'])} {shot !== 0 ? `(${shot} ${declOfNum(shot, ['кадр', 'кадра', 'кадров'])})` : ``}</li>
}

export const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export default (declOfNum, getTimeFromSec, setClassByFilter, timeAgo, filterLabel, shuffle)