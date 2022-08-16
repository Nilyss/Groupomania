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
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'

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
  const [userEnCours, setUserEnCours] = useState('')
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
        const userPoster = users.find((u) => u._id === post.posterId)

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

        async function handleLike(e) {
          e.preventDefault()
          console.log('POST.LIKERS =>', post.likers)
          console.log('USER._ID  =>', user._id)

          if (!post.likers.find((likers) => likers.likerId === user._id)) {
            console.log('LIKE ROUTE')
            const likeData = {
              like: 1,
              likerId: user._id,
            }
            console.log('LIKE DATA =>', likeData)
            await axios.post(
              `${process.env.REACT_APP_API_URL}articles/` + post._id + '/like',
              likeData
            )
            getPosts()
          }
          if (post.likers.find((likers) => likers.likerId === user._id)) {
            console.log('UNLIKE ROUTE')
            const unlikeData = {
              like: 0,
              likerId: user._id,
            }
            console.log('UNLIKE DATA =>', unlikeData)
            axios.post(
              `${process.env.REACT_APP_API_URL}articles/` + post._id + '/like',
              unlikeData
            )

            getPosts()
          }
        }

        async function handleDislike(e) {
          e.preventDefault()
        }

        const isUserPost = user._id === userPoster._id || user.isAdmin === 1

        const clickHandler = (id) => {
          console.log('index =>', index)
          setIsUpdated(!isUpdated)
          setUserEnCours(id)
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
                      {isUserPost && (
                        <>
                          <FontAwesomeIcon
                            onClick={() => {
                              clickHandler(post._id)
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
                        </>
                      )}
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
                      onClick={handleLike}
                      className="likeIcon"
                      icon={faThumbsUp}
                    />
                    <p className="likeIcon__quantity">
                      {isLoading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-spin fa-2x postFlow"
                        />
                      ) : (
                        post.likes
                      )}
                    </p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      onClick={handleDislike}
                      className="dislikeIcon"
                      icon={faThumbsDown}
                    />
                    <p className="dislikeIcon__quantity">
                      {isLoading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-spin fa-2x postFlow"
                        />
                      ) : (
                        post.dislikes
                      )}
                    </p>
                  </div>
                  <div className="postFlow__container__body">
                    {(isUpdated === false || userEnCours !== post._id) && (
                      <p className="postFlow__container__body__text">
                        {post.message}
                      </p>
                    )}
                    {isUpdated === true && userEnCours === post._id && (
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
                  <h4 className="postFlow__container__commentTitle">
                    Comments
                  </h4>
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

                    const isUserComment =
                      user._id === comment.commenterId || user.isAdmin === 1

                    return (
                      <div key={index}>
                        <article className="comment">
                          <div className="comment__header">
                            {isUserComment && (
                              <FontAwesomeIcon
                                onClick={(e) => {
                                  setCommentIsUpdated(!commentIsUpdated)
                                }}
                                className="comment__header__editIcon"
                                icon={faPenToSquare}
                                title="Edit post"
                              />
                            )}
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
                            {isUserComment && (
                              <FontAwesomeIcon
                                onClick={deleteComment}
                                className="comment__header__deleteIcon"
                                icon={faTrashCan}
                                title="Delete post"
                              />
                            )}
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
                  <CreateComment commentId={post._id} />
                </div>
              </article>
            )}
          </li>
        )
      })}
    </>
  )
}
