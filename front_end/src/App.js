import { useState, useEffect } from 'react'

//  Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Context
import { UidContext } from './context/appContext'
import { UserContextProvider } from './context/userContext'

// Pages
import Authentification from './pages/Authentication/Authentication'
import Home from './pages/Home/Home'

// styles
import GlobalStyle from './utils/styles/GlobalStyle'
import './App.scss'

export default function App() {
  const dispatch = useDispatch()
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log('No Token'))
    }
    fetchToken()
  }, [uid])

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UidContext.Provider value={uid}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Authentification />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </UserContextProvider>
      </UidContext.Provider>
    </BrowserRouter>
  )
}
