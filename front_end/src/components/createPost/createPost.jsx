// dependencies
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { PostContext } from '../../context'

//css
import './_createPost.scss'

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default function CreatePost() {
  axios.defaults.withCredentials = true

  const { getPosts, user } = useContext(PostContext)
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />
  const [loadNewArticle, setLoadNewArticle] = useState(true)
  const [file, setFile] = useState(null)

  async function handleFormArticle(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('posterId', user._id)
    formData.append('message', e.target['message'].value)
    formData.append('file', file)
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}articles`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.status === 201) {
          e.target['message'].value = ''
          e.target['message'].value = ''
        }
        getPosts()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  useEffect(() => {
    if (loadNewArticle) {
      setLoadNewArticle(false)
    }
  }, [loadNewArticle])

  return (
    <>
      <article className="createPost">
        <div className="createPost__body">
          <form onSubmit={handleFormArticle} className="createPost__body__form">
            <div className="createPost__body__form__top">
              <figure className="createPost__body__form__top__fig">
                <img
                  className="createPost__body__form__top__fig__img"
                  src={user.profilePicture}
                  alt="profile pictures"
                />
              </figure>
              <label
                htmlFor="post"
                className="createPost__body__form__top__label"
              >
                What's on your mind {user.firstName} ?
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
                <div className="createPost__body__form__bottom__button__attachment__txt">
                  Add photo or picture
                </div>
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
