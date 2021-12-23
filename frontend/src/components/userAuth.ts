import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useLoginCheckMutation } from '../app/observatoryApi'
import { setCredentials } from '../app/authSlice'

export const UserAuth = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth)
    const token = sessionStorage.getItem('token')
    const [ loginCheck ] = useLoginCheckMutation()

    const doCheckToken = async () => {
        try {
            const user = await loginCheck().unwrap()

            if (user.status === false) {
                sessionStorage.setItem('token', '')
            }

            dispatch(setCredentials(user))
        } catch (error) {
            console.error(error)
        }
    }

    // Если нет токена в хранилие - ставим
    if (user.token && user.token !== token) {
        sessionStorage.setItem('token', user.token)
    }

    // Если токен есть в хранилище, но нет в стор
    if (!user.token && token) {
        dispatch(setCredentials({ status: false, token: token }))
        doCheckToken().then()
    }

    return user
}