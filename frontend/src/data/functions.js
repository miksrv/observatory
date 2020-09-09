const getTimeFromSec = (sec) => {
    let h = sec / 3600 ^ 0
    let m = (sec - h * 3600) / 60 ^ 0

    return (h < 10 ? "0" + h : h) + 'ч. ' + ( m < 10 ? "0" + m : m) + 'м.'
}

export default getTimeFromSec