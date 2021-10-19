const config_general = {
    width: 0,           // Default width, 0 = full parent element width;
    // height is determined by projection
    projection: "aitoff",    // Map projection used: see below
    projectionRatio: null,   // Optional override for default projection ratio
    transform: "equatorial", // Coordinate transformation: equatorial (default),
                             // ecliptic, galactic, supergalactic
    center:[10.68,41.267, 0],       // Initial center coordinates in set transform
    // [longitude, latitude, orientation] all in degrees
    // null = default center [0,0,0]
    orientationfixed: true,  // Keep orientation angle the same as center[2]
    // geopos: [51,55],       // optional initial geographic position [lat,lon] in degrees,
    // overrides center
    follow: [10.68,41.267],   // on which coordinates to center the map, default: zenith, if location enabled,
    // otherwise center
    datapath: "https://api.miksoft.pro/skymap/",
    zoomlevel: 5,    // initial zoom level 0...zoomextend; 0|null = default, 1 = 100%, 0 < x <= zoomextend
    zoomextend: 10,     // maximum zoom level
    adaptable: true,    // Sizes are increased with higher zoom-levels
    interactive: true,  // Enable zooming and rotation with mousewheel and dragging
    form: false,         // Display form for interactive settings. Needs a div with
    // id="celestial-form", created automatically if not present
    location: false,    // Display location settings. Deprecated, use formFields below
    advanced: false,     // Display fewer form fields if false
    controls: false,     // Display zoom controls
    lang: "",
    stars: {
        show: true,    // Show stars
        limit: 6,      // Show only stars brighter than limit magnitude
        colors: true,  // Show stars in spectral colors, if not use default color
        style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
        designation: true, // Show star names (Bayer, Flamsteed, Variable star, Gliese or designation,
                           // i.e. whichever of the previous applies first); may vary with culture setting
        designationType: "desig",  // Which kind of name is displayed as designation (fieldname in starnames.json)
        designationStyle: { fill: "#ddddbb", font: "11px sans-serif", align: "left", baseline: "top" },
        designationLimit: 4,  // Show only names for stars brighter than nameLimit
        propername: true,   // Show proper name (if present)
        propernameType: "name", // Languge for proper name, default IAU name; may vary with culture setting
                                // (see list below of languages codes available for stars)
        propernameStyle: { fill: "#ddddbb", font: "13px sans-serif", align: "right", baseline: "bottom" },
        propernameLimit: 3,  // Show proper names for stars brighter than propernameLimit
        size: 7,       // Maximum size (radius) of star circle in pixels
        exponent: -0.28, // Scale exponent for star size, larger = more linear
        data: 'stars.6.json' // Data source for stellar data,
                             // number indicates limit magnitude
    },
    dsos: {
        show: true,    // Show Deep Space Objects
        limit: 6,      // Show only DSOs brighter than limit magnitude
        colors: true,  // // Show DSOs in symbol colors if true, use style setting below if false
        style: { fill: "#cccccc", stroke: "#cccccc", width: 2, opacity: 1 }, // Default style for dsos
        names: true,   // Show DSO names
        namesType: 'desig',  // Type of DSO ('desig' or language) name shown
        // (see list below for languages codes available for dsos)
        nameStyle: { fill: "#cccccc", font: "11px sans-serif",
            align: "left", baseline: "alphabetic" }, // Style for DSO names
        nameLimit: 6,  // Show only names for DSOs brighter than namelimit
        size: null,    // Optional seperate scale size for DSOs, null = stars.size
        exponent: 2.4, // Scale exponent for DSO size, larger = more non-linear
        data: 'dsos.bright.json', // Data source for DSOs,
                                  // opt. number indicates limit magnitude
        symbols: {  //DSO symbol styles, 'stroke'-parameter present = outline
            gg: {shape: "circle", fill: "#ff0000"},          // Galaxy cluster
            g:  {shape: "ellipse", fill: "#ff0000"},         // Generic galaxy
            s:  {shape: "ellipse", fill: "#ff0000"},         // Spiral galaxy
            s0: {shape: "ellipse", fill: "#ff0000"},         // Lenticular galaxy
            sd: {shape: "ellipse", fill: "#ff0000"},         // Dwarf galaxy
            e:  {shape: "ellipse", fill: "#ff0000"},         // Elliptical galaxy
            i:  {shape: "ellipse", fill: "#ff0000"},         // Irregular galaxy
            oc: {shape: "circle", fill: "#ffcc00",
                stroke: "#ffcc00", width: 1.5},             // Open cluster
            gc: {shape: "circle", fill: "#ff9900"},          // Globular cluster
            en: {shape: "square", fill: "#ff00cc"},          // Emission nebula
            bn: {shape: "square", fill: "#ff00cc",
                stroke: "#ff00cc", width: 2},               // Generic bright nebula
            sfr:{shape: "square", fill: "#cc00ff",
                stroke: "#cc00ff", width: 2},               // Star forming region
            rn: {shape: "square", fill: "#00ooff"},          // Reflection nebula
            pn: {shape: "diamond", fill: "#00cccc"},         // Planetary nebula
            snr:{shape: "diamond", fill: "#ff00cc"},         // Supernova remnant
            dn: {shape: "square", fill: "#999999",
                stroke: "#999999", width: 2},               // Dark nebula grey
            pos:{shape: "marker", fill: "#cccccc",
                stroke: "#cccccc", width: 1.5}              // Generic marker
        }
    },
    planets: {  //Show planet locations, if date-time is set
        show: true,
        // List of all objects to show
        which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
        // Font styles for planetary symbols
        symbols: {  // Character and color for each symbol in 'which' above (simple circle: \u25cf), optional size override for Sun & Moon
            "sol": {symbol: "\u2609", letter:"Su", fill: "#ffff00", size:""},
            "mer": {symbol: "\u263f", letter:"Me", fill: "#cccccc"},
            "ven": {symbol: "\u2640", letter:"V", fill: "#eeeecc"},
            "ter": {symbol: "\u2295", letter:"T", fill: "#00ccff"},
            "lun": {symbol: "\u25cf", letter:"L", fill: "#ffffff", size:""}, // overridden by generated crecent, except letter & size
            "mar": {symbol: "\u2642", letter:"Ma", fill: "#ff6600"},
            "cer": {symbol: "\u26b3", letter:"C", fill: "#cccccc"},
            "ves": {symbol: "\u26b6", letter:"Ma", fill: "#cccccc"},
            "jup": {symbol: "\u2643", letter:"J", fill: "#ffaa33"},
            "sat": {symbol: "\u2644", letter:"Sa", fill: "#ffdd66"},
            "ura": {symbol: "\u2645", letter:"U", fill: "#66ccff"},
            "nep": {symbol: "\u2646", letter:"N", fill: "#6666ff"},
            "plu": {symbol: "\u2647", letter:"P", fill: "#aaaaaa"},
            "eri": {symbol: "\u26aa", letter:"E", fill: "#eeeeee"}
        },
        symbolStyle: { fill: "#00ccff", font: "bold 17px sans-serif",
            align: "center", baseline: "middle" },
        symbolType: "symbol",  // Type of planet symbol: 'symbol' graphic planet sign, 'disk' filled circle scaled by magnitude
                               // 'letter': 1 or 2 letters S Me V L Ma J S U N
        names: true,          // Show name in nameType language next to symbol
        nameStyle: { fill: "#00ccff", font: "14px sans-serif", align: "right", baseline: "top" },
        namesType: "desig"     // Language of planet name (see list below of language codes available for planets),
                               // or desig = 3-letter designation
    },
    constellations: {
        names: true,      // Show constellation names
        namesType: "iau", // Type of name Latin (iau, default), 3 letter designation (desig) or other language (see list below)
        nameStyle: { fill:"#cccc99", align: "center", baseline: "middle",
            font: ["14px sans-serif",  // Style for constellations
                "12px sans-serif",  // Different fonts for diff.
                "11px sans-serif"]},// ranked constellations
        lines: true,   // Show constellation lines, style below
        lineStyle: { stroke: "#cccccc", width: 1, opacity: 0.6 },
        bounds: true, // Show constellation boundaries, style below
        boundStyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
    },
    mw: {
        show: true,     // Show Milky Way as filled multi-polygon outlines
        style: { fill: "#ffffff", opacity: 0.15 }  // Style for MW layers
    },
    lines: {  // Display & styles for graticule & some planes
        graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,
            // grid values: "outline", "center", or [lat,...] specific position
            lon: {pos: [""], fill: "#eee", font: "10px sans-serif"},
            // grid values: "outline", "center", or [lon,...] specific position
            lat: {pos: [""], fill: "#eee", font: "10px sans-serif"}},
        equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },
        ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
        galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
    },
    background: {        // Background style
        fill: "#000000",   // Area fill
        opacity: 1,
        stroke: "#000000", // Outline
        width: 1.5
    },
    horizon: {  //Show horizon marker, if location is set and map projection is all-sky
        show: false,
        stroke: "#cccccc", // Line
        width: 1.0,
        fill: "#000",   // Area below horizon
        opacity: .5
    },
    daylight: {  //Show day sky as a gradient, if location is set and map projection is hemispheric
        show: false
    }
}

export default config_general