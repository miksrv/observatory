const config = {
    adaptable: true, // Sizes are increased with higher zoom-levels
    advanced: false, // Display fewer form fields if false
    background: {
        // Background style
        fill: '#232323', // Area fill
        opacity: 1,
        stroke: '#000000', // Outline
        width: 1.5
    },
    // ecliptic, galactic, supergalactic
    center: [10.68, 41.267, 0], // Initial center coordinates in set transform
    constellations: {
        boundStyle: {
            dash: [2, 4],
            opacity: 0.8,
            stroke: '#cccc00',
            width: 0.5
        },
        bounds: true, // Show constellation boundaries, style below
        lineStyle: { opacity: 0.6, stroke: '#cccccc', width: 1 },
        lines: true, // Show constellation lines, style below
        nameStyle: {
            align: 'center',
            baseline: 'middle',
            fill: '#cccc99',
            font: [
                '14px GOST', // Style for constellations
                '12px GOST', // Different fonts for diff.
                '11px GOST'
            ]
        }, // ranked constellations
        names: true, // Show constellation names
        // Type of name Latin (iau, default),
        // 3 letter designation (desig) or other language (see list below)
        namesType: 'iau'
    },
    controls: false, // Display zoom controls
    // otherwise center
    datapath: `${process.env.REACT_APP_API_HOST}public/skymap`,
    daylight: {
        //Show day sky as a gradient, if location is set and map projection is hemispheric
        show: false
    },
    dsos: {
        colors: true, // // Show DSOs in symbol colors if true, use style setting below if false
        data: 'dsos.bright.json', // Data source for DSOs,
        exponent: 2.4, // Scale exponent for DSO size, larger = more non-linear
        limit: 6, // Show only DSOs brighter than limit magnitude
        nameLimit: 6, // Show only names for DSOs brighter than namelimit
        // (see list below for languages codes available for dsos)
        nameStyle: {
            align: 'left',
            baseline: 'alphabetic',
            fill: '#cccccc',
            font: '11px GOST'
        }, // Style for DSO names
        names: true, // Show DSO names
        namesType: 'desig', // Type of DSO ('desig' or language) name shown
        show: true, // Show Deep Space Objects
        size: null, // Optional seperate scale size for DSOs, null = stars.size
        style: { fill: '#cccccc', opacity: 1, stroke: '#cccccc', width: 2 }, // Default style for dsos
        // opt. number indicates limit magnitude
        symbols: {
            bn: {
                fill: '#ff00cc',
                shape: 'square',
                stroke: '#ff00cc',
                width: 2
            }, // Generic bright nebula
            dn: {
                fill: '#999999',
                shape: 'square',
                stroke: '#999999',
                width: 2
            }, // Dark nebula grey
            e: { fill: '#ff0000', shape: 'ellipse' }, // Elliptical galaxy
            en: { fill: '#ff00cc', shape: 'square' }, // Emission nebula
            g: { fill: '#ff0000', shape: 'ellipse' }, // Generic galaxy
            gc: { fill: '#ff9900', shape: 'circle' }, // Globular cluster
            //DSO symbol styles, 'stroke'-parameter present = outline
            gg: { fill: '#ff0000', shape: 'circle' }, // Galaxy cluster
            i: { fill: '#ff0000', shape: 'ellipse' }, // Irregular galaxy
            oc: {
                fill: '#ffcc00',
                shape: 'circle',
                stroke: '#ffcc00',
                width: 1.5
            }, // Open cluster
            pn: { fill: '#00cccc', shape: 'diamond' }, // Planetary nebula
            pos: {
                fill: '#cccccc',
                shape: 'marker',
                stroke: '#cccccc',
                width: 1.5
            }, // Generic marker
            rn: { fill: '#00ooff', shape: 'square' }, // Reflection nebula
            s: { fill: '#ff0000', shape: 'ellipse' }, // Spiral galaxy
            s0: { fill: '#ff0000', shape: 'ellipse' }, // Lenticular galaxy
            sd: { fill: '#ff0000', shape: 'ellipse' }, // Dwarf galaxy
            sfr: {
                fill: '#cc00ff',
                shape: 'square',
                stroke: '#cc00ff',
                width: 2
            }, // Star forming region
            snr: { fill: '#ff00cc', shape: 'diamond' } // Supernova remnant
        }
    },
    // overrides center
    follow: [10.68, 41.267], // on which coordinates to center the map, default: zenith, if location enabled,
    form: false, // Display form for interactive settings. Needs a div with
    geopos: [51.82, 55.17], // optional initial geographic position [lat,lon] in degrees,
    horizon: {
        fill: '#000', // Area below horizon
        opacity: 0.5,
        //Show horizon marker, if location is set and map projection is all-sky
        show: false,
        stroke: '#cccccc', // Line
        width: 1.0
    },
    interactive: true, // Enable zooming and rotation with mousewheel and dragging
    lang: '',
    lines: {
        ecliptic: { opacity: 0.7, show: false, stroke: '#66cc66', width: 1.3 },
        equatorial: {
            opacity: 0.7,
            show: false,
            stroke: '#aaaaaa',
            width: 1.3
        },
        galactic: { opacity: 0.7, show: false, stroke: '#cc6666', width: 1.3 },
        // Display & styles for graticule & some planes
        graticule: {
            // grid values: "outline", "center", or [lon,...] specific position
            lat: { fill: '#eee', font: '10px GOST', pos: [''] },
            // grid values: "outline", "center", or [lat,...] specific position
            lon: { fill: '#eee', font: '10px GOST', pos: [''] },
            opacity: 0.8,
            show: true,
            stroke: '#cccccc',
            width: 0.6
        },
        supergalactic: {
            opacity: 0.7,
            show: false,
            stroke: '#cc66cc',
            width: 1.3
        }
    },
    // id="celestial-form", created automatically if not present
    location: false, // Display location settings. Deprecated, use formFields below
    mw: {
        show: true, // Show Milky Way as filled multi-polygon outlines
        style: { fill: '#ffffff', opacity: 0.15 } // Style for MW layers
    },
    // [longitude, latitude, orientation] all in degrees
    // null = default center [0,0,0]
    orientationfixed: true, // Keep orientation angle the same as center[2]
    planets: {
        nameStyle: {
            align: 'right',
            baseline: 'top',
            fill: '#00ccff',
            font: '14px GOST'
        },
        // 'letter': 1 or 2 letters S Me V L Ma J S U N
        names: true, // Show name in nameType language next to symbol
        namesType: 'desig', // Language of planet name (see list below of language codes available for planets),
        //Show planet locations, if date-time is set
        show: true,
        symbolStyle: {
            align: 'center',
            baseline: 'middle',
            fill: '#00ccff',
            font: 'bold 17px GOST'
        },
        // Type of planet symbol: 'symbol' graphic planet sign,
        // 'disk' filled circle scaled by magnitude
        symbolType: 'symbol',
        // Font styles for planetary symbols
        symbols: {
            cer: { fill: '#cccccc', letter: 'C', symbol: '\u26b3' },
            eri: { fill: '#eeeeee', letter: 'E', symbol: '\u26aa' },
            jup: { fill: '#ffaa33', letter: 'J', symbol: '\u2643' },
            // overridden by generated crecent, except letter & size
            lun: { fill: '#ffffff', letter: 'L', size: '', symbol: '\u25cf' },
            mar: { fill: '#ff6600', letter: 'Ma', symbol: '\u2642' },
            mer: { fill: '#cccccc', letter: 'Me', symbol: '\u263f' },
            nep: { fill: '#6666ff', letter: 'N', symbol: '\u2646' },
            plu: { fill: '#aaaaaa', letter: 'P', symbol: '\u2647' },
            sat: { fill: '#ffdd66', letter: 'Sa', symbol: '\u2644' },
            // Character and color for each symbol in 'which' above
            // (simple circle: \u25cf), optional size override for Sun & Moon
            sol: { fill: '#ffff00', letter: 'Su', size: '', symbol: '\u2609' },
            ter: { fill: '#00ccff', letter: 'T', symbol: '\u2295' },
            ura: { fill: '#66ccff', letter: 'U', symbol: '\u2645' },
            ven: { fill: '#eeeecc', letter: 'V', symbol: '\u2640' },
            ves: { fill: '#cccccc', letter: 'Ma', symbol: '\u26b6' }
        },
        // List of all objects to show
        which: [
            'sol',
            'mer',
            'ven',
            'ter',
            'lun',
            'mar',
            'jup',
            'sat',
            'ura',
            'nep'
        ]
        // or desig = 3-letter designation
    },
    // height is determined by projection
    projection: 'aitoff', // Map projection used: see below
    projectionRatio: null, // Optional override for default projection ratio
    stars: {
        colors: true, // Show stars in spectral colors, if not use default color
        data: 'stars.6.json', // Data source for stellar data,
        designation: true, // Show star names (Bayer, Flamsteed, Variable star, Gliese or designation,
        designationLimit: 4, // Show only names for stars brighter than nameLimit
        designationStyle: {
            align: 'left',
            baseline: 'top',
            fill: '#ddddbb',
            font: '11px GOST'
        },
        // i.e. whichever of the previous applies first); may vary with culture setting
        designationType: 'desig', // Which kind of name is displayed as designation (fieldname in starnames.json)
        exponent: -0.28, // Scale exponent for star size, larger = more linear
        limit: 6, // Show only stars brighter than limit magnitude
        propername: true, // Show proper name (if present)
        propernameLimit: 3, // Show proper names for stars brighter than propernameLimit
        // (see list below of languages codes available for stars)
        propernameStyle: {
            align: 'right',
            baseline: 'bottom',
            fill: '#ddddbb',
            font: '13px GOST'
        },
        propernameType: 'name', // Languge for proper name, default IAU name; may vary with culture setting
        show: true, // Show stars
        size: 7, // Maximum size (radius) of star circle in pixels
        style: { fill: '#ffffff', opacity: 1 } // Default style for stars
        // number indicates limit magnitude
    },
    transform: 'equatorial', // Coordinate transformation: equatorial (default),
    width: 0, // Default width, 0 = full parent element width;
    zoomextend: 10, // maximum zoom level
    zoomlevel: 5 // initial zoom level 0...zoomextend; 0|null = default, 1 = 100%, 0 < x <= zoomextend
}

export default config
