//  Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Context
import { UserContextProvider } from './context/userContext'

// Pages
import Authentification from './pages/Authentication/Authentication'
import Home from './pages/Home/Home'

// styles
import GlobalStyle from './utils/styles/GlobalStyle'
import './App.scss'

export default function App() {
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Authentification />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}
