import config_general from './config_general'

const config_object = {
    width: 0,
    projection: 'aitoff',
    projectionRatio: null,
    transform: 'equatorial',
    datapath: config_general.datapath,
    zoomlevel: 5,
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
        designationStyle: { fill: '#ffffff', font: '11px sans-serif', align: 'left', baseline: 'top' },
        designationLimit: 4,
        propername: true,
        propernameType: 'name',
        propernameStyle: { fill: '#ffffff', font: '11px sans-serif', align: 'right', baseline: 'bottom' },
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
        nameStyle: { fill: '#cccc99', align: 'center', baseline: 'middle', font: '12px sans-serif' },
        lines: true,
        lineStyle: { stroke: '#a9efad', width: 1, opacity: 0.6 },
        bounds: true,
        boundStyle: { stroke: '#cccc00', width: 0.5, opacity: 0.8, dash: [2, 4] }
    },
    mw: { show: true },
    lines: {
        graticule: { show: true, stroke: '#cccccc', width: 0.6, opacity: 0.5,
            lon: { pos: [''], fill: '#eee', font: '10px sans-serif' },
            lat: { pos: [''], fill: '#eee', font: '10px sans-serif' }},
    },
    background: {
        fill: '#131617',
        opacity: .8,
        stroke: '#131617',
        width: 1.5
    },
    horizon: { show: false },
    daylight: { show: false }
}

export default config_object