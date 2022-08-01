// dependencies
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { PostContext } from '../../context'

//css
import './_createPost.scss'

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

// reducer
import { getArticles } from '../../redux/actions/articleActions'
import { useContext } from 'react'

export default function CreatePost() {
  const { getPosts } = useContext(PostContext)
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />
  const userData = useSelector((state) => state.userReducer)
  const [loadNewArticle, setLoadNewArticle] = useState(true)
  const dispatch = useDispatch()

  axios.defaults.withCredentials = true

  function handleFormArticle(e) {
    e.preventDefault()

    try {
      const articleData = {
        posterId: userData._id,
        message: e.target['message'].value,
        picture: e.target['picture'].value,
      }
      axios
        .post(`${process.env.REACT_APP_API_URL}articles`, articleData)
        .then((res) => {
          if (res.status === 201) {
            e.target['message'].value = ''
            e.target['picture'].value = ''
          }
          getPosts()
        })
    } catch (err) {
      console.log("Can't create post, error : " + err)
    }
  }

  useEffect(() => {
    if (loadNewArticle) {
      dispatch(getArticles())
      setLoadNewArticle(false)
    }
  }, [loadNewArticle, dispatch])

  return (
    <>
      <article className="createPost">
        <div className="createPost__body">
          <form onSubmit={handleFormArticle} className="createPost__body__form">
            <div className="createPost__body__form__top">
              <figure className="createPost__body__form__top__fig">
                <img
                  className="createPost__body__form__top__fig__img"
                  src={userData.profilePicture}
                  alt="profile pictures"
                />
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
                <div className="createPost__body__form__bottom__button__attachment__txt">
                  Add photo or picture
                </div>
                <input
                  name="picture"
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
