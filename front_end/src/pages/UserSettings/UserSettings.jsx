// libraries
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// css
import './_UserSettings.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faSpinner,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

export default function UserSettings() {
  axios.defaults.withCredentials = true

  const { isLoading, getUser, userData } = useContext(PostContext)
  const [loadNewFile, setLoadNewFile] = useState(true)
  const [file, setFile] = useState(null)
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />
  const arrowIcon = (
    <Link to={'/home'}>
      <FontAwesomeIcon icon={faArrowLeft} className="previousArrowIcon" />
    </Link>
  )

  async function handleFormSettings(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}users/` + userData._id,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        getUser()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  useEffect(() => {
    if (loadNewFile) {
      setLoadNewFile(false)
    }
  }, [loadNewFile])

  const isAdmin = userData.isAdmin === 1

  return (
    <>
      <Header />
      {arrowIcon}
      <main className="userSettingsMain">
        <section>
          <article className="userSettingsMain__form">
            <div className="userSettingsMain__form__header">
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="fa-spin fa-2x showUser__pp"
                />
              ) : (
                <h1 className="userSettingsMain__form__header__title">
                  User Settings
                </h1>
              )}
            </div>
            <div className="userSettingsMain__form__body">
              <form
                onSubmit={handleFormSettings}
                className="userSettingsMain__form__body__form"
              >
                <p className="userSettingsMain__form__body__form__firstName">
                  <strong>First Name:</strong> {userData.firstName}
                </p>
                <p className="userSettingsMain__form__body__form__lastName">
                  <strong>Last Name:</strong> {userData.lastName}
                </p>
                <p className="userSettingsMain__form__body__form__email">
                  <strong>email address:</strong> {userData.email}
                </p>
                {isAdmin && (
                  <p className="userSettingsMain__form__body__form__isAdmin">
                    <strong>Administrator account: </strong> Yes
                  </p>
                )}
                <div className="userSettingsMain__form__body__form__inputs">
                  <figure className="userSettingsMain__form__body__form__fig">
                    <img
                      className="userSettingsMain__form__body__form__fig__img"
                      src={userData.profilePicture}
                      alt="avatar"
                    />
                  </figure>
                  <label className="pp__upload--label" htmlFor="file">
                    <span className="pp__upload--icon">{imageIcon}</span>
                  </label>
                  <input
                    onChange={handleFileSelect}
                    accept=".jpg, .jpeg, .png"
                    name="file"
                    id="file"
                    className="userSettingsMain__form__body__form__input"
                    type="file"
                  />
                </div>
                <button className="userSettingsMain__form__body__form__button">
                  Save changes
                </button>
              </form>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
