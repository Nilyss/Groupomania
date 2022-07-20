import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserContextProvider(props) {
  const [modalState, setModalState] = useState({
    signUpModal: true,
    signInModal: true,
  })

  const toggleModals = (modal) => {
    if (modal === 'signIn') {
      setModalState({
        signUpModal: true,
        signInModal: true,
      })
    }
    if (modal === 'signUn') {
      setModalState({
        signUpModal: true,
        signInModal: true,
      })
    }
  }

  return (
    <UserContext.Provider value={{ modalState, toggleModals }}>
      {props.children}
    </UserContext.Provider>
  )
}
