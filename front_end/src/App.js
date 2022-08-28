import { useState, useEffect } from 'react'

//  Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Context
import { UidContext } from './context/userIdContext'
import { UserContextProvider } from './context/formContext'

// Pages
import Authentification from './pages/Authentication/Authentication'
import Home from './pages/Home/Home'
import UserSettings from './pages/UserSettings/UserSettings'
import OnePost from './pages/onePost/onePost'

// styles
import GlobalStyle from './utils/styles/GlobalStyle'
import './App.scss'
import { getUser } from './redux/actions/userActions'
import NotFound from './pages/NotFound/NotFound'

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
        .catch((err) => console.log(err + 'No token'))
    }
    fetchToken()

    if (uid) {
      dispatch(getUser(uid))
    }
  }, [uid, dispatch])

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UidContext.Provider value={uid}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Authentification />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/userSettings" element={<UserSettings />}></Route>
            <Route path="/post/:id" element={<OnePost />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </UserContextProvider>
      </UidContext.Provider>
    </BrowserRouter>
  )
}
