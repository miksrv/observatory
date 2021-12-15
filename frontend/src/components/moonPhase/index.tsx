import React from 'react'
import moment from 'moment'
import SunCalc from 'suncalc'

type TMoonPhaseProps = {
    date: string
}

const phases: any = {
    '1'    : '1', // 🌑 new moon
    '0'    : '2', // 🌒
    '0.125': '3', // 🌒
    '0.25' : '4', // 🌓
    '0.375': '5', // 🌔
    '0.5'  : '6', // 🌕 full moon
    '0.625': '7', // 🌖
    '0.75' : '8', // 🌗
    '0.875': '9', // 🌘
}

const MoonPhase: React.FC<TMoonPhaseProps> = (props) => {
    const { date } = props
    const phase: number = Math.round(SunCalc.getMoonIllumination(moment.utc(date).utcOffset('GMT+05:00')).phase * 8) / 8
    const style: string = phases[phase.toString()]

    return (
        <span className={`moon phase-${style}`}></span>
    )
}

export default MoonPhase