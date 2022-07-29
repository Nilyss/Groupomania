// dependencies
import axios from 'axios'
import { useSelector } from 'react-redux'

//css
import './_createPost.scss'

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default function CreatePost() {
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />
  const userData = useSelector((state) => state.userReducer)

  axios.defaults.withCredentials = true

  function handleFormArticle(e) {
    e.preventDefault()

    try {
      const articleData = {
        posterId: userData._id,
        message: e.target['message'].value,
        picture: e.target['picture'].value,
      }
      axios.post(`${process.env.REACT_APP_API_URL}articles`, articleData)
    } catch (err) {
      console.log("Can't create post, error : " + err)
    }
  }

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
