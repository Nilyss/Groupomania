// dependencies
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

// css
import './_card.scss'

// libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

axios.defaults.withCredentials = true

export default function Card() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const usersData = useSelector((state) => state.usersReducer)
  // const userData = useSelector((state) => state.userReducer)

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}articles`)
      setPosts(res.data)
      setIsLoading(false)
    }
    getPosts()
  }, [setPosts])

  async function deletePost() {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}articles/:_id`)
      .then((res) => {
        setPosts(res.data)
        setIsLoading(false)
      })
  }
  return (
    <>
      {posts.map((post) => {
        return (
          <li className="cardContainer" key={post._id}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x" />
            ) : (
              <article className="postFlow">
                <div className="postFlow__container">
                  <div className="postFlow__container__header">
                    <div className="postFlow__container__header__iconContainer">
                      <FontAwesomeIcon
                        className="postFlow__container__header__iconContainer__icon"
                        icon={faPenToSquare}
                        title="Edit post"
                      />
                      <FontAwesomeIcon
                        onClick={deletePost}
                        className="postFlow__container__header__iconContainer__icon"
                        icon={faTrashCan}
                        title="Delete post"
                      />
                    </div>
                    <figure className="createPost__body__form__top__fig">
                      <img
                        className="createPost__body__form__top__fig__img"
                        src={usersData
                          .map((user) => {
                            if (user._id === post.posterId) {
                              return user.profilePicture
                            }
                          })
                          .join('')}
                        alt="profile"
                      />
                    </figure>
                    <h5 className="postFlow__container__title">
                      {usersData.map((user) => {
                        if (user._id === post.posterId) {
                          return user.firstName
                        }
                      })}{' '}
                      {usersData.map((user) => {
                        if (user._id === post.posterId) {
                          return user.lastName
                        }
                      })}
                    </h5>
                  </div>
                  <figure className="postFlow__container__figure">
                    <img className="postFlow__container__figure__img" alt="" />
                  </figure>
                  <div className="postFlow__container__body">
                    <p className="postFlow__container__body__text">
                      {post.message}
                    </p>
                  </div>
                  {/*<div className="postFlow__container__footer">*/}
                  {/*  <span className="postFlow__container__footer__like"></span>*/}
                  {/*  <h6 className="postFlow__container__footer__title">*/}
                  {/*    Comments :*/}
                  {/*  </h6>*/}
                  {/*  <p className="postFlow__container__footer__comment">*/}
                  {/*    Exemple: i'm an incredible comment*/}
                  {/*  </p>*/}
                  {/*  <p className="postFlow__container__footer__comment">*/}
                  {/*    Exemple: i'm an incredible comment*/}
                  {/*  </p>*/}
                  {/*  <label*/}
                  {/*    htmlFor="comment"*/}
                  {/*    className="postFlow__container__footer__label"*/}
                  {/*  >*/}
                  {/*    Comment it:*/}
                  {/*  </label>*/}
                  {/*  <input*/}
                  {/*    id="comment"*/}
                  {/*    className="postFlow__container__footer__input"*/}
                  {/*    type="text"*/}
                  {/*  />*/}
                  {/*  <button*/}
                  {/*    className="postFlow__container__footer__submit"*/}
                  {/*    type="submit"*/}
                  {/*  >*/}
                  {/*    Send*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </div>
              </article>
            )}
          </li>
        )
      })}
    </>
  )
}
