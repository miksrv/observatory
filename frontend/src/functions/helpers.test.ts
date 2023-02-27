import { declOfNum, timeAgo, getTimeFromSec } from 'functions/helpers'

describe('Test helper functions', () => {
    it('declOfNum', () => {
        const words = ['день', 'дня', 'дней']

        expect(declOfNum(101, words)).toBe('день')
        expect(declOfNum(22, words)).toBe('дня')
        expect(declOfNum(47, words)).toBe('дней')
    })

    it('timeAgo', () => {
        expect(timeAgo(0)).toBe('обновлено недавно')
        expect(timeAgo(3631)).toBe('01 ч. 31 сек. назад')
    })

    it('getTimeFromSec', () => {
        expect(getTimeFromSec(-1)).toBe('')
        expect(getTimeFromSec(300)).toBe('00:05')
        expect(getTimeFromSec(300, true)).toBe('0 часов 5 минут')
    })
})
