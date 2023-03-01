import React, { useEffect } from 'react'

const Error: React.FC = () => {
    useEffect(() => {
        document.title = 'Ошибка - Обсерватория'
    })

    return <div>Error Page</div>
}

export default Error
