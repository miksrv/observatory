import translate from 'functions/translate'

const lang = translate().menu

type TMenuItems = {
    link: string,
    name: string,
    label?: 'photos' | 'objects'
}

export const MENU_ITEMS:TMenuItems[] = [
    { link: '/', name: lang.summary },
    { link: '/news', name: lang.news },
    { link: '/map', name: 'Карта' },
    { link: '/photos', name: lang.photo, label: 'photos' },
    { link: '/objects', name: lang.objects, label: 'objects' },
    { link: '/dashboard', name: lang.dashboard },
]
