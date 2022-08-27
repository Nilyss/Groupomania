// libraries
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

// components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// api
import { putRequest, deleteRequest, getRequest } from '../../api/apiCall'
import apiEndpoints from '../../api/apiEndpoints'

// css
import './_UserSettings.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faSpinner,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

export default function UserSettings() {
  const { isLoading, getUser, getUsers, userData, articlesData } =
    useContext(PostContext)
  const [loadNewFile, setLoadNewFile] = useState(true)
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
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
      const axiosResponse = await putRequest(
        apiEndpoints.updateUser + '/' + userData._id,
        formData
      )
      if (axiosResponse.status === 200) {
        getUser()
        getUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  // handle delete user function
  const deleteUser = async () => {
    // eslint-disable-next-line no-restricted-globals
    const fistConfirmation = confirm('Delete your account ?')
    // eslint-disable-next-line no-restricted-globals
    const secondConfirmation = confirm(
      'Are you sure ? Every post and comments will be forever destroyed.'
    )
    if (fistConfirmation) {
      if (secondConfirmation) {
        try {
          articlesData.forEach((article) => {
            const isUserPost = article.posterId === userData._id
            if (isUserPost === true) {
              try {
                async function deleteUserPost() {
                  const axiosResponseDeletePost = await deleteRequest(
                    apiEndpoints.deleteArticle + '/' + article._id
                  )
                  if (axiosResponseDeletePost.status === 200) {
                    const axiosResponse = await deleteRequest(
                      apiEndpoints.deleteUser + '/' + userData._id
                    )
                    if (axiosResponse.status === 200) {
                      // remove token stored in cookies on http only if the backend  removing function didn't worked for safety
                      const removeCookie = (key) => {
                        if (window !== undefined) {
                          cookie.remove(key, { expires: 1 })
                        }
                      }
                      removeCookie('jwt')

                      navigate('/', { replace: true })
                    }
                  }
                }
                deleteUserPost()
              } catch (err) {
                console.log(err)
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        return
      }
    } else {
      return
    }
  }

  const handleDeleteButton = (e) => {
    e.preventDefault()
    deleteUser()
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
              <form onSubmit={handleDeleteButton}>
                <p>Delete account</p>
                <button>Yes, i want wipe all my data</button>
              </form>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
