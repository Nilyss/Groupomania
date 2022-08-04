// dependencies
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { PostContext } from '../../context'

// css
import './_card.scss'

// libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

axios.defaults.withCredentials = true

export default function Card() {
  const { getPosts, posts, isLoading, getUsers, users, getUser } =
    useContext(PostContext)

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {posts.map((post) => {
        const deletePost = async () => {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}articles/` + post._id
          )
        }
        const likePost = async () => {
          const data = { like: 1 }
          await axios.post(
            `${process.env.REACT_APP_API_URL}articles/` + post._id + `/like`,
            data
          )
        }
        const likesNumber = post.likers.length
        let userPoster = users.find((u) => u._id === post.posterId)

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
                        src={userPoster.profilePicture}
                        alt="profile"
                      />
                    </figure>
                    <h5 className="postFlow__container__title">
                      {userPoster.firstName} {userPoster.lastName}
                    </h5>
                  </div>
                  <figure className="postFlow__container__figure">
                    <img className="postFlow__container__figure__img" alt="" />
                  </figure>
                  <div>
                    <FontAwesomeIcon
                      onClick={likePost}
                      className="likeIcon"
                      icon={faThumbsUp}
                    />
                    <p className="likeIcon__number">{likesNumber}</p>
                  </div>
                  <div className="postFlow__container__body">
                    <p className="postFlow__container__body__text">
                      {post.message}
                    </p>
                  </div>
                </div>
              </article>
            )}
          </li>
        )
      })}
    </>
  )
}
