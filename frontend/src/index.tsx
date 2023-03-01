import App from 'App'
import 'moment/locale/ru'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import 'styles/index.sass'

import { store } from 'app/store'

// if (process.env.NODE_ENV === 'development') {
//     const { worker } = require('./__mocks__/browser')
//     worker.start()
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
