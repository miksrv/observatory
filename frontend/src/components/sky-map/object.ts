import config from './config'

const object = {
    adaptable: false,
    background: config.background,
    center: [0, 20, 0],
    constellations: {
        boundStyle: {
            dash: [2, 4],
            opacity: 0.8,
            stroke: '#cccc00',
            width: 0.5
        },
        bounds: true,
        lineStyle: { opacity: 0.6, stroke: '#a9efad', width: 1 },
        lines: true,
        nameStyle: {
            align: 'center',
            baseline: 'middle',
            fill: '#ffa51f',
            font: '15px GOST'
        },
        names: true,
        namesType: 'iau'
    },
    datapath: config.datapath,
    daylight: { show: false },
    dsos: { show: false },
    follow: [0, 0],
    form: false,
    geopos: config.geopos,
    horizon: { show: false },
    interactive: false,
    lang: '',
    lines: {
        graticule: {
            lat: { fill: '#eee', font: '10px GOST', pos: [0] },
            lon: { fill: '#eee', font: '10px GOST', pos: [0] }, // hor
            opacity: 0.5,
            show: true,
            stroke: '#cccccc',
            width: 0.6
        } // vert
    },
    mw: { show: false },
    planets: { show: false },
    projection: 'aitoff',
    projectionRatio: null,
    stars: {
        colors: true,
        data: 'stars.6.json',
        designation: true,
        designationLimit: 4,
        designationStyle: {
            align: 'left',
            baseline: 'top',
            fill: '#ffffff',
            font: '13px GOST'
        },
        designationType: 'desig',
        exponent: -0.28,
        limit: 4,
        propername: true,
        propernameLimit: 3,
        propernameStyle: {
            align: 'right',
            baseline: 'bottom',
            fill: '#ffffff',
            font: '13px GOST'
        },
        propernameType: 'name',
        show: true,
        size: 11,
        style: { fill: '#ffffff', opacity: 1 }
    },
    transform: 'equatorial',
    width: 0,
    zoomlevel: 5
}

export default object
