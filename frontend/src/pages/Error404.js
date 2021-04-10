import React from 'react'
import { Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import MainContainer from '../components/MainContainer'

const Error404 = () => {
    return (
        <MainContainer
            title='Новости'
        >
            <Container>
                <div className='card photo-info error404'>
                    <h1>404</h1>
                    <h2>УПС, ЧТО-ТО ПОШЛО НЕ ТАК</h2>
                    <p>Страница, которую вы искали, могла быть удалена,<br />она изменила ссылку или просто временно недоступен.</p>
                    <NavLink exact to='/'>Вернуться на главную страницу</NavLink>
                </div>
            </Container>
        </MainContainer>
    )
}

export default Error404