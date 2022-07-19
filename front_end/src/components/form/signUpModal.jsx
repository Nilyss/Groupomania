import { useContext, useState, useRef } from 'react'
import { UserContext } from '../../context/userContext'

export default function SignUpModal() {
  const { toggleModals, modalState } = useContext(UserContext)
  const [validation, setValidation] = useState('')

  // push all inputs from form into inputs variable
  const inputs = useRef([])
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  return (
    <>
      {modalState.signUpModal && (
        <section className="Container">
          <div className="modalBG"> </div>
          <div className="FromBG">
            <div className="modalContainer">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modalHeader">
                    <h5 className="modalTitle">Sign-Up</h5>
                    <button onClick={() => toggleModals('signIn')}>
                      Sign-In
                    </button>
                  </div>
                  <div className="modal-Body">
                    <form>
                      <div className="formContainer">
                        <label htmlFor="firstName" className="formLabel">
                          First Name
                        </label>
                        <input
                          ref={addInputs}
                          name="firstName"
                          required
                          type="text"
                          className="formInput"
                          id="firstName"
                        />
                      </div>
                      <div className="formContainer">
                        <label htmlFor="lastName" className="formLabel">
                          Last Name
                        </label>
                        <input
                          ref={addInputs}
                          name="lastName"
                          required
                          type="text"
                          className="formInput"
                          id="lastName"
                        />
                      </div>
                      <div className="formContainer">
                        <label htmlFor="signUpMail" className="formLabel">
                          eMail address
                        </label>
                        <input
                          ref={addInputs}
                          name="mail"
                          required
                          type="email"
                          className="formInput"
                          id="signUpMail"
                        />
                      </div>
                      <div className="formContainer">
                        <label htmlFor="password" className="formLabel">
                          Password
                        </label>
                        <input
                          ref={addInputs}
                          name="password"
                          required
                          type="password"
                          className="formInput"
                          id="password"
                        />
                      </div>
                      <div className="formContainer">
                        <label htmlFor="confirmPassword" className="formLabel">
                          Confirm password
                        </label>
                        <input
                          ref={addInputs}
                          name="password"
                          required
                          type="texte"
                          className="formInput"
                          id="confirmPassword"
                        />
                        <p className="error">err</p>
                      </div>
                      <button className="Submit btn">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
