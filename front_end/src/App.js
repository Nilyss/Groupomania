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
import { getUser } from './redux/actions/userActions'

export default function App() {
  axios.defaults.withCredentials = true
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}jwtid`)
        .then((res) => {
          setUid(res.data)
        })
        .catch((err) => console.log('No token'))
    }
    fetchToken()

    if (uid) {
      dispatch(getUser(uid))
    }
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
