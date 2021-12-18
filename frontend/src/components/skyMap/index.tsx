import React, { useEffect } from 'react'
import celestial from 'd3-celestial'
import config from './object'

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
    objects: TObject[] | undefined
}

type TObject = {
    ra: number
    dec: number
    name: string
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

const SkyMap: React.FC<TSkyMapProps> = (props) => {
    const { objects } = props

    useEffect(() => {
        if (objects === undefined || !objects.length) return

        const SkyMap = celestial.Celestial()
        const objJSON = createObjectsJSON(objects)

        SkyMap.clear()
        SkyMap.add({
            type: 'Point', callback: (error: any) => {
                if (error) return console.warn(error)

                let skyPoint = SkyMap.getData(objJSON, config.transform);

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
        })

        if (objects.length === 1) {
            config.follow = [objects[0].ra, objects[0].ra]
            config.center = [objects[0].ra, objects[0].dec, 0]
        }

        // config.interactive = true

        SkyMap.display(config)

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

    }, [objects])

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

    return <div id='celestial-map' className='sky-map'></div>
}

export default SkyMap