import config from './config'

const object = {
    width: 0,
    projection: 'aitoff',
    projectionRatio: null,
    transform: 'equatorial',
    datapath: config.datapath,
    zoomlevel: 5,
    geopos: config.geopos,
    adaptable: true,
    interactive: false,
    lang: '',
    stars: {
        show: true,
        limit: 4,
        colors: true,
        style: { fill: '#ffffff', opacity: 1 },
        designation: true,
        designationType: 'desig',
        designationStyle: { fill: '#ffffff', font: '13px GOST', align: 'left', baseline: 'top' },
        designationLimit: 4,
        propername: true,
        propernameType: 'name',
        propernameStyle: { fill: '#ffffff', font: '13px GOST', align: 'right', baseline: 'bottom' },
        propernameLimit: 3,
        size: 11,
        exponent: -0.28,
        data: 'stars.6.json'
    },
    dsos: { show: false },
    planets: { show: false },
    constellations: {
        names: true,
        namesType: 'iau',
        nameStyle: { fill: '#ffa51f', align: 'center', baseline: 'middle', font: '15px GOST' },
        lines: true,
        lineStyle: { stroke: '#a9efad', width: 1, opacity: 0.6 },
        bounds: true,
        boundStyle: { stroke: '#cccc00', width: 0.5, opacity: 0.8, dash: [2, 4] }
    },
    mw: { show: true },
    lines: {
        graticule: { show: true, stroke: '#cccccc', width: 0.6, opacity: 0.5,
            lon: { pos: [''], fill: '#eee', font: '10px GOST' },
            lat: { pos: [''], fill: '#eee', font: '10px GOST' }}
    },
    background: config.background,
    horizon: { show: false },
    daylight: { show: false },
    follow: [0, 0],
    center: [0, 0, 0]
}

export default object