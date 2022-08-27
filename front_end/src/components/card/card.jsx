// libraries
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment-timezone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'

// css
import './_card.scss'

// api
import { deleteRequest, postRequest, putRequest } from '../../api/apiCall'
import apiEndpoints from '../../api/apiEndpoints'

// context
import { PostContext } from '../../context'

// components
import CreateComment from '../createComment/createComment'

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

  // rendering DOM
  return (
    <>
      {usersData &&
        userData &&
        articlesData.map((post, index) => {
          // get user poster data  for render them in DOM
          const userPoster = usersData.find((u) => u._id === post.posterId)

          // check if post have a picture for rendering figure balise only if  the post have image
          const haveAPicture = post.picture !== undefined

          // *************** handle function using map array ***************

          // handle edit article function
          const updateArticle = async (e) => {
            e.preventDefault()

            const data = {
              posterId: userPoster._id,
              message: messageUpdate,
            }
            try {
              const axiosResponse = await putRequest(
                apiEndpoints.editArticle + '/' + post._id,
                data
              )
              if (axiosResponse.status === 200) {
                setIsUpdated(!isUpdated)
                getArticles()
              }
            } catch (error) {
              console.log(error)
            }
          }

          // handle delete article function
          const deletePost = async () => {
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm('Delete article ?')
            if (confirmation) {
              try {
                const axiosResponse = await deleteRequest(
                  apiEndpoints.deleteArticle + '/' + post._id
                )
                if (axiosResponse.status === 200) {
                  getArticles()
                }
              } catch (error) {
                console.log(error)
              }
            }
          }

          // handle like article function
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

              const axiosResponse = await postRequest(
                apiEndpoints.getAllArticles +
                  '/' +
                  post._id +
                  apiEndpoints.likes,
                likeData
              )
              if (axiosResponse.status === 201) {
                getArticles()
              }
            }
            // if the user unlike an article
            if (post.likers.find((likers) => likers.likerId === userData._id)) {
              const unlikeData = {
                like: 0,
                likerId: userData._id,
              }
              const axiosResponse = await postRequest(
                apiEndpoints.getAllArticles +
                  '/' +
                  post._id +
                  apiEndpoints.likes,
                unlikeData
              )
              if (axiosResponse.status === 200) {
                getArticles()
              }
            }
          }

          // handle dislike article function
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
              const axiosResponse = await postRequest(
                apiEndpoints.getAllArticles +
                  '/' +
                  post._id +
                  apiEndpoints.likes,
                dislikeData
              )
              if (axiosResponse.status === 201) {
                getArticles()
              }
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
              const axiosResponse = await postRequest(
                apiEndpoints.getAllArticles +
                  '/' +
                  post._id +
                  apiEndpoints.likes,
                undislikeData
              )
              if (axiosResponse.status === 200) {
                getArticles()
              }
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

          // handle Functions for saving  edit post & comment messages in state
          const handleEditPost = (id) => {
            setIsUpdated(!isUpdated)
            setTargetElement(id)
          }

          const handleEditComment = (id) => {
            setCommentIsUpdated(!commentIsUpdated)
            setTargetElement(id)
          }

          // Variable for libraries Moment to format timestamp saved in database
          const dateToFormat = `${post.createdAt}`

          // Rendering DOM articles
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
                    {haveAPicture && (
                      <figure className="postFlow__container__figure">
                        <img
                          className="postFlow__container__figure__img"
                          src={post.picture}
                          alt=""
                        />
                      </figure>
                    )}
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
                      // map comments to render them in DOM

                      // handle function for updating comment
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
                        try {
                          const axiosResponse = await putRequest(
                            apiEndpoints.getAllArticles +
                              '/' +
                              post._id +
                              apiEndpoints.editComment,
                            data
                          )
                          if (axiosResponse.status === 200) {
                            setCommentIsUpdated(!commentIsUpdated)
                            getArticles()
                          }
                        } catch (err) {
                          console.log(err)
                        }
                      }

                      // handle function for deleting comment
                      const deleteComment = async () => {
                        const data = {
                          commentId: comment._id,
                        }
                        // eslint-disable-next-line no-restricted-globals
                        const confirmation = confirm('Delete comment ?')
                        if (confirmation) {
                          try {
                            const axiosResponse = await postRequest(
                              apiEndpoints.getAllArticles +
                                '/' +
                                post._id +
                                apiEndpoints.deleteComment,
                              data
                            )
                            if (axiosResponse.status === 201) {
                              getArticles()
                            }
                          } catch (err) {
                            console.log(err)
                          }
                        }
                      }

                      // check if user is the user poster of comment or if the user is admin for rendering icons who contain onClick function
                      const isUserComment =
                        userData._id === comment.commenterId ||
                        userData.isAdmin === 1

                      // check if the commenter still existing in database or if he was removed
                      const isCommenterExist = usersData.find(
                        (user) => user._id === comment.commenterId
                      )

                      // render article comments
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
                              {isCommenterExist ? (
                                <>
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
                                </>
                              ) : (
                                <>
                                  <figure className="comment__header__fig">
                                    <img
                                      src="https://i.imgur.com/FixNDJZ.jpg"
                                      className="comment__header__fig__img"
                                      alt=""
                                    />
                                  </figure>
                                  <h5 className="comment__header__title">
                                    Deleted User {comment.commenterId}
                                  </h5>
                                </>
                              )}
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
