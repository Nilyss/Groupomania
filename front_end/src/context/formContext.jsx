import { createContext, useState } from 'react'

export const FormContext = createContext()

export function UserContextProvider(props) {
  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: true,
  })

  const toggleModals = (modal) => {
    if (modal === 'signIn') {
      setModalState({
        signUpModal: false,
        signInModal: true,
      })
    }
    if (modal === 'signUp') {
      setModalState({
        signUpModal: true,
        signInModal: false,
      })
    }
  }

  return (
    <FormContext.Provider value={{ modalState, toggleModals }}>
      {props.children}
    </FormContext.Provider>
  )
}
