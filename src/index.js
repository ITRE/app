import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './css/index.css'
import App from './App'
//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
), document.getElementById('root'))
