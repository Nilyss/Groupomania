import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

//  Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

//dev tools
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

// reducers
import rootReducer from './redux/reducers'

// Context
import { UserContextProvider } from './context/userContext'

// Pages
import Authentification from './pages/Authentication/Authentication'
import Home from './pages/Home/Home'

// styles
import GlobalStyle from './utils/styles/GlobalStyle'
import './App.scss'
//
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk, logger))
// )

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <Provider store={store}>
  <BrowserRouter>
    <GlobalStyle />
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Authentification />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
  // </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
