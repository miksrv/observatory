import translate from './translate'

const lang = translate().general.declining

export const declOfNum = (number: number, words: string[]) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]]
}

/**
 * Returns the formatted time elapsed since the beginning of the event
 * @param sec {number}
 * @param full {boolean}
 * @returns {string}
 */
export const getTimeFromSec = (sec: number, full: boolean = false): string => {
    if (sec <= 0)
        return ''

    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

    if (full)
        return `${h} ${declOfNum(h, lang.hours)} ${m} ${declOfNum(m, lang.minutes)}`

    return (h < 10 ? "0" + h : h) + ':' + ( m < 10 ? "0" + m : m)
}