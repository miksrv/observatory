import React from 'react'
import { version, update } from '../../../package.json'

import './styles.sass'

const Footer: React.FC = () => {
    return (
        <div className='footer'>
            <div>Powered by Arduino, PHP + MySQL, ReactJS + TS + Redux RTK.</div>
            <div>Copyright ©
                <a href='https://miksoft.pro' className='copyright-link' title=''>
                    <img src='https://miksoft.pro/favicon.ico' alt='' /> Mik
                </a> 2022, Version {version} ({update})
            </div>
        </div>
    )
}

export default Footer