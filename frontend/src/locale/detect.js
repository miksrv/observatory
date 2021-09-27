import languageRU from '../locale/ru/translate.json'

const lang = () => {
    switch (navigator.language) {
        case 'ru-RU': return languageRU

        default: return languageRU
    }
}

export default lang()