import React from 'react'

/**
 * Returns the value of the parameter by key from the address bar of the browser
 * @example `?date=24.06.2021`
 * @param name
 * @returns {string|string}
 */
export const getUrlParameter = name => {
    name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]')
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

/**
 * Depending on the number, selects a word from the array for the set
 * @param number {number}
 * @param words {array}
 * @returns {*}
 */
export const declOfNum = (number, words) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]
}

/**
 * Returns the formatted time elapsed since the beginning of the event
 * @param sec {string}
 * @param full {boolean}
 * @returns {string}
 */
export const getTimeFromSec = (sec, full = false) => {
    if (sec <= 0)
        return ''

    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

    if (full)
        return `${h} ${declOfNum(h, ['час', 'часа', 'часов'])} ${m} ${declOfNum(m, ['минута', 'минуты', 'минут'])}`

    return (h < 10 ? "0" + h : h) + ':' + ( m < 10 ? "0" + m : m)
}

/**
 * Maps filter names from API to style class names
 * @param filter
 * @returns {string}
 */
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

/**
 * Formats seconds into a familiar format (hours, minutes)
 * @param sec {number}
 * @returns {string}
 */
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

/**
 * Creates a JSX element for visualizing filter information (excerpt, frames and filter name)
 * @param sec {number}
 * @param shot {number}
 * @param name {string}
 * @returns {JSX.Element|string}
 */
export const filterLabel = (sec, shot = 0, name) => {
    if (sec === 0) return ''

    const min = Math.round(sec / 60)

    return <li><span className={'filter ' + setClassByFilter(name)}>{name}</span> {min} {declOfNum(min, ['минута', 'минуты', 'минут'])} {shot !== 0 ? `(${shot} ${declOfNum(shot, ['кадр', 'кадра', 'кадров'])})` : ``}</li>
}

/**
 * Shuffles the array randomly
 * @param array
 * @returns {array}
 */
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

export default (declOfNum, getTimeFromSec, setClassByFilter, timeAgo, filterLabel, shuffle, getUrlParameter)