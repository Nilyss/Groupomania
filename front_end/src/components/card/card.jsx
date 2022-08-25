// dependencies
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PostContext } from '../../context'

// css
import './_card.scss'

// libraries
import Moment from 'react-moment'
import 'moment-timezone'
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
  const { usersData, articlesData, userData, isLoading, getArticles } =
    useContext(PostContext)

  // post edit state
  const [isUpdated, setIsUpdated] = useState(false)
  const [targetElement, setTargetElement] = useState('')
  const [messageUpdate, setMessageUpdate] = useState(null)

  // comment edit state
  const [commentIsUpdated, setCommentIsUpdated] = useState(false)
  const [commentUpdate, setCommentUpdate] = useState(null)

  return (
    <>
      {usersData &&
        userData &&
        articlesData.map((post, index) => {
          const userPoster = usersData.find((u) => u._id === post.posterId)

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
            await getArticles()
          }

          const deletePost = async () => {
            await axios.delete(
              `${process.env.REACT_APP_API_URL}articles/` + post._id
            )
            await getArticles()
          }

          async function handleLike(e) {
            e.preventDefault()

            // if the user like an article
            if (
              !post.likers.find((likers) => likers.likerId === userData._id)
            ) {
              const likeData = {
                like: 1,
                likerId: userData._id,
              }
              await axios.post(
                `${process.env.REACT_APP_API_URL}articles/` +
                  post._id +
                  '/like',
                likeData
              )
              getArticles()
            }
            // if the user unlike an article
            if (post.likers.find((likers) => likers.likerId === userData._id)) {
              const unlikeData = {
                like: 0,
                likerId: userData._id,
              }
              await axios.post(
                `${process.env.REACT_APP_API_URL}articles/` +
                  post._id +
                  '/like',
                unlikeData
              )
              getArticles()
            }
          }

          async function handleDislike(e) {
            e.preventDefault()

            // if the user dislike an article
            if (
              !post.disLikers.find(
                (dislikers) => dislikers.disLikerId === userData._id
              )
            ) {
              const dislikeData = {
                like: -1,
                disLikerId: userData._id,
              }
              await axios.post(
                `${process.env.REACT_APP_API_URL}articles/` +
                  post._id +
                  '/like',
                dislikeData
              )
              getArticles()
            }

            // if the user un dislike an article
            if (
              post.disLikers.find(
                (dislikers) => dislikers.disLikerId === userData._id
              )
            ) {
              const undislikeData = {
                like: 0,
                disLikerId: userData._id,
              }
              await axios.post(
                `${process.env.REACT_APP_API_URL}articles/` +
                  post._id +
                  '/like',
                undislikeData
              )
              getArticles()
            }
          }

          // Condition for deletion and editing post
          const isUserPost =
            userData._id === userPoster._id || userData.isAdmin === 1

          // Condition for showing like or dislike button, if the post was already disliked or liked
          const isLiked = post.likers.find(
            (likers) => likers.likerId === userData._id
          )
          const isDisliked = post.disLikers.find(
            (dislikers) => dislikers.disLikerId === userData._id
          )

          const handleEditPost = (id) => {
            setIsUpdated(!isUpdated)
            setTargetElement(id)
          }

          const handleEditComment = (id) => {
            setCommentIsUpdated(!commentIsUpdated)
            setTargetElement(id)
          }

          const dateToFormat = `${post.createdAt}`

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
                                handleEditPost(post._id)
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
                      <Link to={`/post/${post._id}`} className="link">
                        <Moment
                          format="YYYY/MM/DD - HH:mm"
                          className="postFlow__container__postCreatedAt"
                        >
                          {dateToFormat}
                        </Moment>
                      </Link>
                    </div>
                    <figure className="postFlow__container__figure">
                      <img
                        className="postFlow__container__figure__img"
                        src={post.picture}
                        alt=""
                      />
                    </figure>
                    <div className="postFlow__container__body">
                      {(isUpdated === false || targetElement !== post._id) && (
                        <p className="postFlow__container__body__text">
                          {post.message}
                        </p>
                      )}
                      {isUpdated === true && targetElement === post._id && (
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
                    <div className="likeSection">
                      {isDisliked ? (
                        <FontAwesomeIcon
                          className="likeIcon"
                          icon={faThumbsUp}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={handleLike}
                          className="likeIcon"
                          icon={faThumbsUp}
                        />
                      )}
                      {isLiked && (
                        <FontAwesomeIcon
                          onClick={handleLike}
                          className="likeIcon likeIconTrue"
                          icon={faThumbsUp}
                        />
                      )}
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
                      {isLiked ? (
                        <FontAwesomeIcon
                          className="dislikeIcon"
                          icon={faThumbsDown}
                        />
                      ) : (
                        <FontAwesomeIcon
                          onClick={handleDislike}
                          className="dislikeIcon"
                          icon={faThumbsDown}
                        />
                      )}
                      {isDisliked && (
                        <FontAwesomeIcon
                          onClick={handleDislike}
                          className="dislikeIcon dislikeIconTrue"
                          icon={faThumbsDown}
                        />
                      )}
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
                    <h4 className="postFlow__container__commentTitle">
                      Comments
                    </h4>
                    {post.comments.map((comment, index) => {
                      const updateComment = async (e) => {
                        e.preventDefault()

                        const data = {
                          commentId: comment._id,
                          commenterId: userData._id,
                          commenterFirstName: userData.firstName,
                          commenterLastName: userData.lastName,
                          commenterProfilePicture: userData.profilePicture,
                          text: commentUpdate,
                        }

                        await axios.put(
                          `${process.env.REACT_APP_API_URL}articles/` +
                            post._id +
                            '/comment',
                          data
                        )
                        setCommentIsUpdated(!commentIsUpdated)
                        await getArticles()
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
                        await getArticles()
                      }

                      const isUserComment =
                        userData._id === comment.commenterId ||
                        userData.isAdmin === 1

                      return (
                        <div key={index}>
                          <article className="comment">
                            <div className="comment__header">
                              {isUserComment && (
                                <FontAwesomeIcon
                                  onClick={() => {
                                    handleEditComment(comment._id)
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
                              {(commentIsUpdated === false ||
                                targetElement !== comment._id) && (
                                <p className="comment__body__message">
                                  {comment.text}
                                </p>
                              )}
                              {commentIsUpdated === true &&
                                targetElement === comment._id && (
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
