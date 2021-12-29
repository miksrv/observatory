import React, { useEffect, useRef } from 'react'
import celestial from 'd3-celestial'
import config from './object'

type TRenderMapProps = {
    geoJSON: {
        type: 'FeatureCollection'
        features: {
            type: 'Feature'
            id: string
            properties: {
                name: string
                mag: number
                dim: number
            }
            geometry: {
                type: string,
                coordinates: [number, number]
            }
        }[]
    },
    config: any
}

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

const usePrevious: any = (value: any) => {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

const RenderMap: React.FC<TRenderMapProps> = (props) => {
    const { geoJSON, config: customConfig } = props
    const prevJSON = usePrevious({geoJSON})

    useEffect(() => {
        if (prevJSON === undefined || JSON.stringify(prevJSON.geoJSON) !== JSON.stringify(geoJSON)) {
            const SkyMap = celestial.Celestial()

            SkyMap.clear()
            SkyMap.add({
                type: 'Point', callback: (error: any) => {
                    if (error) return console.warn(error)

                    let skyPoint = SkyMap.getData(geoJSON, config.transform)

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
            }, [geoJSON])

            if (geoJSON.features.length === 1) {
                config.follow = [geoJSON.features[0].geometry.coordinates[0], geoJSON.features[0].geometry.coordinates[1]]
                config.center = [geoJSON.features[0].geometry.coordinates[0], geoJSON.features[0].geometry.coordinates[1], 0]
            }

            config.interactive = customConfig.interactive

            SkyMap.display(config)
        }
    }, [geoJSON, prevJSON, customConfig.interactive])

    // const canvas = document.querySelector('canvas')
    // const ctx = canvas?.getContext("2d")
    //
    // canvas?.addEventListener('click', (e) => {
    //     const rect = canvas.getBoundingClientRect()
    //     const x = e.clientX - rect.left
    //     const y = e.clientY - rect.top
    //
    //     const pt2 = SkyMap.mapProjection([299.908, 22.7231])
    //
    //     // работает
    //     // ctx?.beginPath();
    //     // ctx?.arc(x,y,5,0,10*Math.PI);
    //     // ctx?.arc(pt2[0],pt2[1],5,0,2*Math.PI);
    //     // ctx?.fill();
    //
    //     const findObjects: any[] = objects.filter((item) => {
    //         const obj_cord = SkyMap.mapProjection([item.ra, item.dec])
    //
    //         if (Math.abs(x-obj_cord[0]) <= 15 && Math.abs(y-obj_cord[1]) <= 15) return true
    //         return false
    //     })
    //
    //     if (findObjects.length) {
    //         console.log('findObjects', findObjects.length, findObjects.pop().name)
    //     }
    // })

    // const canvas = document.querySelector('canvas')
    // const ctx = canvas?.getContext("2d")
    //
    // const getCursorPosition = (canvas: any, event: any) => {
    //     const rect = canvas.getBoundingClientRect()
    //     const x = event.clientX - rect.left
    //     const y = event.clientY - rect.top
    //
    //     const coords = SkyMap.mapProjection([299.908, 22.7231])
    //
    //
    //     // console.log('test', SkyMap.mapProjection([x, y]))
    //     console.log('coords', event.offsetX, event.offsetX)
    //
    // }
    //
    // canvas?.addEventListener('mousedown', (e) => {
    //     getCursorPosition(canvas, e)
    // })

    return (
        <div id='celestial-map' className='sky-map'></div>
    )
}

export default RenderMap