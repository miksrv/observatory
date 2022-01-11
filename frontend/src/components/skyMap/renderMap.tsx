import React, { useEffect, useRef } from 'react'
import { TObject, geoJSON } from './types'
import celestial from 'd3-celestial'
import config from './object'

type TRenderMapProps = {
    config: any
    objects: TObject[]
    width: number
    goto?: [number, number]
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

const createObjectsJSON = (objects: TObject[]) => {
    const JSON: any = {
        type: 'FeatureCollection',
        features: []
    }

    objects.map((item) => {
        const objectName = item.name.replace(/_/g, ' ')
        const objectJSON = {
            type: 'Feature',
            id: objectName,
            properties: {
                name: objectName,
                mag: 10,
                dim: 30
            },
            geometry: {
                type: 'Point',
                coordinates: [item.ra, item.dec]
            }
        }

        return JSON.features.push(objectJSON)
    })

    return JSON
}

const RenderMap: React.FC<TRenderMapProps> = (props) => {
    const { objects, width, config: customConfig, goto } = props
    const prevJSON = usePrevious({objects})
    const SkyMap = celestial.Celestial()

    // const box = document.createElement('div')

    // box.style.width='200px'
    // box.style.height='100px'
    // box.style.background='gray'

    // document.body.appendChild(box);

    useEffect(() => {
        if (prevJSON === undefined || JSON.stringify(prevJSON.objects) !== JSON.stringify(objects)) {

            const geoJSON: geoJSON = createObjectsJSON(objects)

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

            config.width = width
            config.interactive = customConfig.interactive

            SkyMap.display(config)

            // if (customConfig.interactive) {
            //     const canvas = document.querySelector('canvas')
            //     // const ctx = canvas?.getContext("2d")
            //
            //     canvas?.addEventListener('click', (e) => {
            //         const rect = canvas.getBoundingClientRect()
            //         const x = e.clientX - rect.left
            //         const y = e.clientY - rect.top
            //
            //         // Добавить точку в месте клика
            //         // ctx?.beginPath();
            //         // ctx?.arc(x,y,5,0,2*Math.PI);
            //         // ctx?.fill();
            //
            //         const findObjects: any[] = objects.filter((item: { ra: any; dec: any }) => {
            //             const obj_cord = SkyMap.mapProjection([item.ra, item.dec])
            //
            //             if (Math.abs(x-obj_cord[0]) <= 15 && Math.abs(y-obj_cord[1]) <= 15) return true
            //             return false
            //         })
            //
            //         if (findObjects.length) {
            //             const objectParam = findObjects.pop()
            //
            //             // box.style.left = e.clientX + 'px'
            //             // box.style.top = e.clientY + 'px'
            //             // box.innerHTML = objectParam.name
            //
            //             // SkyMap.rotate({ center: [ objectParam.ra, objectParam.dec, 1 ]})
            //
            //             console.log('findObjects', objectParam)
            //         }
            //     })
            // }
        }
    }, [SkyMap, objects, prevJSON, width, customConfig.interactive])

    useEffect(() => {
        if (goto !== undefined && goto[0] !== 0 && goto[1] !== 0) {
            SkyMap.rotate({ center: [ goto[0], goto[1], 1 ]})
        }
    }, [SkyMap, goto])

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