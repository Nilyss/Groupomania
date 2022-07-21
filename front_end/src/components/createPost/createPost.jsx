//css
import './_createPost.scss'
import testPP from './testPP.webp'

//libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default function createPost() {
  const imageIcon = <FontAwesomeIcon icon={faImage} size="1x" />

  return (
    <>
      <article className="createPost">
        <div className="createPost__body">
          <form className="createPost__body__form">
            <div className="createPost__body__form__top">
              <figure className="createPost__body__form__top__fig">
                <img
                  className="createPost__body__form__top__fig__img"
                  src={testPP}
                  alt="profile pictures"
                />
              </figure>
              <labem
                htmlFor="post"
                className="createPost__body__form__top__label"
              >
                Tell us what's on your mind Rick ?
              </labem>
              <textarea
                id="post"
                className="createPost__body__form__top__textArea"
              ></textarea>
            </div>
            <div className="createPost__body__form__bottom">
              <div className="createPost__body__form__bottom__button__attachment">
                Add photo or picture
                {imageIcon}
              </div>
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
