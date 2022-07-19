import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

//  Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Context
import { UserContextProvider } from './context/userContext'

// Pages
import Authentification from './pages/Authentication'

// styles
import GlobalStyle from './utils/styles/GlobalStyle'
import './App.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Authentification />}></Route>
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
