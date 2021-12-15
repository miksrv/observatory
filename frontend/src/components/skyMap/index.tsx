import React, { useEffect } from 'react'
import celestial from 'd3-celestial'
import object from './object'

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

type TSkyMapProps = {
    ra: number | undefined
    dec: number | undefined
    name: string | undefined
}

const SkyMap: React.FC<TSkyMapProps> = (props) => {
    const { ra, dec, name } = props

    useEffect(() => {
        if ( ! ra || ! dec || ! name )
            return

        let SkyMap  = celestial.Celestial(),
            objName = name && name.replace(/_/g, ' '),
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
                        coordinates: [ra, dec]
                    }
                }
                ]};

        SkyMap.clear()
        SkyMap.add({
            type: 'Point', callback: (error: any) => {
                if (error) return console.warn(error)

                let skyPoint = SkyMap.getData(objJSON, object.transform);

                SkyMap.container.selectAll('.sky-points')
                    .data(skyPoint.features)
                    .enter().append('path')
                    .attr('class', 'sky-points')
                SkyMap.redraw()
            }, redraw: () => {
                SkyMap.container.selectAll('.sky-points').each((point: { geometry: { coordinates: any }; properties: { name: any } }) => {
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

        object.follow = [ra, dec]
        object.center = [ra, dec, 0]

        SkyMap.display(object)
    }, [ra, dec, name])

    return <div id='celestial-map' className='sky-map'></div>
}

export default SkyMap