// dependencies
import { useState, useContext } from 'react'
import { PostContext } from '../../context'

//css
import './_createPost.scss'

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons'

// api
import { postRequest } from '../../api/apiCall'
import apiEndpoints from '../../api/apiEndpoints'

export default function CreatePost() {
  // init hooks
  const { userData, isLoading, getArticles } = useContext(PostContext)
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />
  const [file, setFile] = useState(null)

  //  create post form submit
  async function handleFormArticle(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('posterId', userData._id)
    formData.append('message', e.target['message'].value)
    formData.append('file', file)
    try {
      const axiosResponse = await postRequest(
        apiEndpoints.postArticle,
        formData
      )
      if (axiosResponse.status === 201) {
        e.target['message'].value = ''
        e.target['message'].value = ''
        getArticles()
      }
    } catch (error) {
      console.log(error)
    }
  }
  // save in state the picture send by user
  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  // rendering DOM
  return (
    <>
      <article className="createPost">
        <div className="createPost__body">
          <form onSubmit={handleFormArticle} className="createPost__body__form">
            <div className="createPost__body__form__top">
              <figure className="createPost__body__form__top__fig">
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin fa-2x createPost__body__form__top__fig__img"
                  />
                ) : (
                  <img
                    className="createPost__body__form__top__fig__img"
                    src={userData.profilePicture}
                    alt="profile pictures"
                  />
                )}
              </figure>
              <label
                htmlFor="post"
                className="createPost__body__form__top__label"
              >
                What's on your mind {userData.firstName} ?
              </label>
              <textarea
                name="message"
                id="post"
                className="createPost__body__form__top__textArea"
              ></textarea>
            </div>
            <div className="createPost__body__form__bottom">
              <label
                href="#"
                className="createPost__body__form__bottom__button__attachment"
              >
                <input
                  onChange={handleFileSelect}
                  accept=".jpg, .jpeg, .png"
                  id="file"
                  name="file"
                  className="createPost__body__form__bottom__button__attachment__input"
                  type="file"
                />
                <span className="createPost__body__form__bottom__button__attachment__icon">
                  {imageIcon}
                </span>
              </label>
              <button className="createPost__body__form__bottom__button submitButton">
                Post
              </button>
            </div>
          </form>
        </div>
      </article>
    </>
  )
}
