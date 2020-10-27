export const getTimeFromSec = (sec) => {
    if (sec <= 0)
        return ''

    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

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

export default getTimeFromSec