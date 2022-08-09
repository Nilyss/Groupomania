// dependencies
import { useEffect, useContext, useState } from 'react'
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
    getUsers,
    users,
    getUser,
    user,
  } = useContext(PostContext)

  // post edit state
  const [isUpdated, setIsUpdated] = useState(false)
  const [messageUpdate, setMessageUpdate] = useState(null)

  // comment edit state
  const [commentIsUpdated, setCommentIsUpdated] = useState(false)
  const [commentUpdate, setCommentUpdate] = useState(null)

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
      {posts.map((post, index) => {
        let userPoster = users.find((u) => u._id === post.posterId)
        const likesQuantity = post.likers.length

        const updateArticle = async (e) => {
          e.preventDefault()

          const data = {
            posterId: userPoster._id,
            message: messageUpdate,
          }
          await axios.put(
            `${process.env.REACT_APP_API_URL}articles/` + post._id,
            data
          )
          setIsUpdated(!isUpdated)
          await getPosts()
        }

        const deletePost = async () => {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}articles/` + post._id
          )
          await getPosts()
        }

        const LikeAndUnlike = async (likersId) => {
          post.likers.forEach((l) => {
            return (likersId = l.likerId)
          })
          // if the user already like the post => unlike it
          if (userPoster._id === likersId) {
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

        return (
          <li className="cardContainer" key={index}>
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
                        onClick={(e) => {
                          setIsUpdated(!isUpdated)
                        }}
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
                    {isUpdated === false && (
                      <p className="postFlow__container__body__text">
                        {post.message}
                      </p>
                    )}
                    {isUpdated === true && (
                      <div className="updatePost">
                        <textarea
                          className="updatePost__textarea"
                          defaultValue={post.message}
                          onChange={(e) => setMessageUpdate(e.target.value)}
                        />
                        <div className="updatePost__buttonContainer">
                          <button
                            onClick={(e) => updateArticle(e)}
                            className="updatePost__buttonContainer__button"
                          >
                            Edit post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <CreateComment commentId={post._id} />
                  {post.comments.map((comment, index) => {
                    const updateComment = async (e) => {
                      e.preventDefault()

                      const data = {
                        commentId: comment._id,
                        commenterId: user._id,
                        commenterFirstName: user.firstName,
                        commenterLastName: user.lastName,
                        commenterProfilePicture: user.profilePicture,
                        text: commentUpdate,
                      }

                      await axios.put(
                        `${process.env.REACT_APP_API_URL}articles/` +
                          post._id +
                          '/comment',
                        data
                      )
                      setCommentIsUpdated(!commentIsUpdated)
                      await getPosts()
                    }

                    const deleteComment = async () => {
                      const data = {
                        commentId: comment._id,
                      }
                      await axios.post(
                        `${process.env.REACT_APP_API_URL}articles/` +
                          post._id +
                          '/comment/delete',
                        data
                      )
                      await getPosts()
                    }
                    return (
                      <div key={index}>
                        <article className="comment">
                          <div className="comment__header">
                            <FontAwesomeIcon
                              onClick={(e) => {
                                setCommentIsUpdated(!commentIsUpdated)
                              }}
                              className="comment__header__editIcon"
                              icon={faPenToSquare}
                              title="Edit post"
                            />
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
                            <FontAwesomeIcon
                              onClick={deleteComment}
                              className="comment__header__deleteIcon"
                              icon={faTrashCan}
                              title="Delete post"
                            />
                          </div>
                          <div className="comment__body">
                            {commentIsUpdated === false && (
                              <p className="comment__body__message">
                                {comment.text}
                              </p>
                            )}
                            {commentIsUpdated === true && (
                              <div className="updateComment">
                                <textarea
                                  className="updateComment__textarea"
                                  defaultValue={comment.text}
                                  onChange={(e) =>
                                    setCommentUpdate(e.target.value)
                                  }
                                />
                                <div className="updateComment__buttonContainer">
                                  <button
                                    onClick={(e) => updateComment(e)}
                                    className="updateComment__buttonContainer__button"
                                  >
                                    Edit comment
                                  </button>
                                </div>
                              </div>
                            )}
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
