import React, { useEffect } from 'react'
import celestial from 'd3-celestial'
import config_object from '../skymap/config_object'

const stylePoint = {
    stroke: '#ff0000',
    width: 1,
    fill: 'rgba(252,130,130,0.4)'
}

const styleText = {
    fill:'#ff0000',
    font: '12px sans-serif',
    align: 'left',
    baseline: 'bottom'
}

const ObjectMap = (props) => {
    useEffect(() => {
        let floatRA  = parseFloat(props.data.ra),
            floatDEC = parseFloat(props.data.dec)

        let SkyMap  = celestial.Celestial(),
            objName = (props.name) && props.name.replace(/_/g, ' '),
            objJSON = {
                type: 'FeatureCollection',
                'features': [{
                    type: 'Feature',
                    id: objName,
                    properties: {
                        name: objName,
                        mag: 10,
                        dim: 30
                    }, geometry: {
                        type: 'Point',
                        coordinates: [floatRA, floatDEC]
                    }
                }
            ]};

        SkyMap.clear()
        SkyMap.add({
            type: 'Point', callback: (error, json) => {
                if (error) return console.warn(error)

                let skyPoint = SkyMap.getData(objJSON, config_object.transform);

                SkyMap.container.selectAll('.sky-points')
                    .data(skyPoint.features)
                    .enter().append('path')
                    .attr('class', 'sky-points')
                SkyMap.redraw()
            }, redraw: () => {
                SkyMap.container.selectAll('.sky-points').each((point) => {
                    if (SkyMap.clip(point.geometry.coordinates)) {
                        let pointCoords = SkyMap.mapProjection(point.geometry.coordinates),
                            pointRadius = 5

                        SkyMap.setStyle(stylePoint)
                        SkyMap.context.beginPath()
                        SkyMap.context.arc(pointCoords[0], pointCoords[1], pointRadius, 0, 2 * Math.PI)
                        SkyMap.context.closePath()
                        SkyMap.context.stroke()
                        SkyMap.context.fill()
                        SkyMap.setTextStyle(styleText)
                        SkyMap.context.fillText(point.properties.name, pointCoords[0] + pointRadius - 1, pointCoords[1] - pointRadius + 1)
                    }
                });
            }
        } )

        config_object.follow = [floatRA, floatDEC]
        config_object.center = [floatRA, floatDEC, 0]

        SkyMap.display(config_object)
    }, [props.data, props.name])

    return (
        <div id='celestial-map'></div>
    )
}

export default ObjectMap