import React from 'react'
import { Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import lang from '../locale/detect'

const Error404 = () => {
    return (
        <MainContainer
            title='Новости'
        >
            <Container>
                <div className='card photo-info error404'>
                    <h1>404</h1>
                    <h2>{lang.error404.header}</h2>
                    <p>{lang.error404.description}</p>
                    <NavLink exact to='/'>{lang.error404.linkBack}</NavLink>
                </div>
            </Container>
        </MainContainer>
    )
}

export default Error404