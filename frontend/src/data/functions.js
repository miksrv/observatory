const getTimeFromSec = (sec) => {
    if (sec <= 0)
        return ''

    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

    return (h < 10 ? "0" + h : h) + ':' + ( m < 10 ? "0" + m : m)
}

export default getTimeFromSec