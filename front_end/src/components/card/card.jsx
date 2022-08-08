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

// components
import CreateComment from '../createComment/createComment'

axios.defaults.withCredentials = true

export default function Card() {
  const {
    isLoading,
    getPosts,
    posts,
    getOnePost,
    post,
    getUsers,
    users,
    getUser,
    user,
  } = useContext(PostContext)

  useEffect(() => {
    async function fetchData() {
      await getPosts()
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      await getOnePost()
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      await getUsers()
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      await getUser()
    }
    fetchData()
  }, [])

  return (
    <>
      {posts.map((post) => {
        let userPoster = users.find((u) => u._id === post.posterId)

        const deletePost = async () => {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}articles/` + post._id
          )
        }

        const LikeAndUnlike = async (likersId) => {
          post.likers.forEach((l) => {
            return (likersId = l.likerId)
          })
          // if the user already like the post => unlike it
          if (user._id === likersId) {
            const removeData = { likerId: userPoster._id }
            await axios.post(
              `${process.env.REACT_APP_API_URL}articles/` + post._id + `/like`,
              removeData
            )
            // if the user didn't like the post => like it
          } else {
            const data = { like: 1, likerId: userPoster._id }
            await axios.post(
              `${process.env.REACT_APP_API_URL}articles/` + post._id + `/like`,
              data
            )
          }
        }

        const likesQuantity = post.likers.length

        return (
          <li className="cardContainer" key={post._id}>
            {isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="fa-spin fa-2x postFlow"
              />
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
                    <img
                      className="postFlow__container__figure__img"
                      src={post.picture}
                      alt=""
                    />
                  </figure>
                  <div>
                    <FontAwesomeIcon
                      onClick={LikeAndUnlike}
                      className="likeIcon"
                      icon={faThumbsUp}
                    />
                    <p className="likeIcon__number">{likesQuantity}</p>
                  </div>
                  <div className="postFlow__container__body">
                    <p className="postFlow__container__body__text">
                      {post.message}
                    </p>
                  </div>
                  <CreateComment />
                  {post.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <article className="comment">
                          <div className="comment__header">
                            <figure className="comment__header__fig">
                              <img
                                src={comment.commenterProfilePicture}
                                className="comment__header__fig__img"
                                alt=""
                              />
                            </figure>
                            <h5 className="comment__header__title">
                              {comment.commenterFirstName}{' '}
                              {comment.commenterLastName}
                            </h5>
                          </div>
                          <div className="comment__body">
                            <p className="comment__body__message">
                              {comment.text}
                            </p>
                          </div>
                        </article>
                      </div>
                    )
                  })}
                </div>
              </article>
            )}
          </li>
        )
      })}
    </>
  )
}
