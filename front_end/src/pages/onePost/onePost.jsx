// libraries
import { useContext, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faPenToSquare,
  faSpinner,
  faThumbsDown,
  faThumbsUp,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

// context
import { PostContext } from '../../context'

// components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// css
import './_onePost.scss'
import CreateComment from '../../components/createComment/createComment'

// api
import ArticleServices from '../../api/Services/ArticleServices'
const articleServices = new ArticleServices()

export default function OnePost() {
  const { articlesData, usersData, userData, getArticles, isLoading } =
    useContext(PostContext)

  const arrowIcon = (
    <Link to={'/home'}>
      <FontAwesomeIcon icon={faArrowLeft} className="previousArrowIcon" />
    </Link>
  )

  // states
  const [isUpdated, setIsUpdated] = useState(false)
  const [targetElement, setTargetElement] = useState('')
  const [messageUpdate, setMessageUpdate] = useState(null)
  const [commentIsUpdated, setCommentIsUpdated] = useState(false)
  const [commentUpdate, setCommentUpdate] = useState(null)

  // useNavigate hook from react router dom for change page after deleting post
  const navigate = useNavigate()

  // useParams hook from react router dom for extract post id requested
  let params = useParams()

  const getRequestedPost =
    articlesData && articlesData.find((p) => p._id === params.id)

  // get the poster ID of article
  const userPoster =
    usersData &&
    getRequestedPost &&
    usersData.find((u) => u._id === getRequestedPost.posterId)

  // check if the connected user is the user poster of article or if it's an admin
  const isUserPost =
    getRequestedPost &&
    (userData._id === userPoster._id || userData.isAdmin === 1)

  // Condition for showing like or dislike button, if the post was already disliked or liked
  const isLiked =
    getRequestedPost &&
    getRequestedPost.likers.find((likers) => likers.likerId === userData._id)
  const isDisliked =
    getRequestedPost &&
    getRequestedPost.disLikers.find(
      (dislikers) => dislikers.disLikerId === userData._id
    )

  // dateFormat for Moment libraries
  const dateToFormat = getRequestedPost && `${getRequestedPost.createdAt}`

  //  ******** handle function ********

  const handleEditPost = (id) => {
    setIsUpdated(!isUpdated)
    setTargetElement(id)
  }

  // handle edit article function
  const updateArticle = async (e) => {
    e.preventDefault()

    const data = {
      posterId: userPoster._id,
      message: messageUpdate,
    }
    try {
      await articleServices.putArticle(getRequestedPost._id, data)
      setIsUpdated(!isUpdated)
      getArticles()
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
        await articleServices.deleteArticle(getRequestedPost._id)
        getArticles()
        navigate('/home', { replace: true })
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
      !getRequestedPost.likers.find((likers) => likers.likerId === userData._id)
    ) {
      const likeData = {
        like: 1,
        likerId: userData._id,
      }
      await articleServices.postLike(getRequestedPost._id, likeData)
      getArticles()
    }
    // if the user unlike an article
    if (
      getRequestedPost.likers.find((likers) => likers.likerId === userData._id)
    ) {
      const unlikeData = {
        like: 0,
        likerId: userData._id,
      }
      await articleServices.postLike(getRequestedPost._id, unlikeData)
      getArticles()
    }
  }

  // handle dislike article function
  async function handleDislike(e) {
    e.preventDefault()

    // if the user dislike an article
    if (
      !getRequestedPost.disLikers.find(
        (dislikers) => dislikers.disLikerId === userData._id
      )
    ) {
      const dislikeData = {
        like: -1,
        disLikerId: userData._id,
      }
      await articleServices.postLike(getRequestedPost._id, dislikeData)
      getArticles()
    }

    // if the user un dislike an article
    if (
      getRequestedPost.disLikers.find(
        (dislikers) => dislikers.disLikerId === userData._id
      )
    ) {
      const undislikeData = {
        like: 0,
        disLikerId: userData._id,
      }
      await articleServices.postLike(getRequestedPost._id, undislikeData)
      getArticles()
    }
  }

  const handleEditComment = (id) => {
    setCommentIsUpdated(!commentIsUpdated)
    setTargetElement(id)
  }

  // rendering DOM
  return (
    <>
      <Header />
      {arrowIcon}
      {getRequestedPost &&
        (usersData ? (
          <article className="onePost">
            <div className="onePostContainer">
              <div className="onePostContainer__header">
                <div className="onePostContainer__header__iconContainer">
                  {isUserPost && (
                    <>
                      <FontAwesomeIcon
                        onClick={() => {
                          handleEditPost(getRequestedPost._id)
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
                <figure
                  aria-label="Photo de profil du créateur du post"
                  className="onePostContainer__header__fig"
                >
                  <img
                    className="onePostContainer__header__fig__posterPP"
                    src={userPoster.profilePicture}
                    alt="user poster"
                  />
                </figure>
                <h5 className="onePostContainer__header__title">
                  {userPoster.firstName} {userPoster.lastName}
                </h5>
                <Link to={`/post/${getRequestedPost._id}`} className="link">
                  <Moment
                    format="YYYY/MM/DD - HH:mm"
                    className="postFlow__container__postCreatedAt"
                  >
                    {dateToFormat}
                  </Moment>
                </Link>
              </div>
              <div className="onePostContainer__body">
                <figure
                  aria-label="Photo jointe au post par l'utilisateur"
                  className="onePostContainer__body__fig"
                >
                  <img
                    className="onePostContainer__body__fig__img"
                    src={getRequestedPost.picture}
                    alt=""
                  />
                </figure>
                <div className="onePostContainer__body__message__container">
                  {(isUpdated === false ||
                    targetElement !== getRequestedPost._id) && (
                    <p className="onePostContainer__body__message__container__message">
                      {getRequestedPost.message}
                    </p>
                  )}
                  {isUpdated === true &&
                    targetElement === getRequestedPost._id && (
                      <div className="onePostContainer__body__message__container__updatePost">
                        <textarea
                          className="onePostContainer__body__message__container__updatePost__textArea"
                          defaultValue={getRequestedPost.message}
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
              </div>
              <div className="likeSection">
                {isDisliked ? (
                  <FontAwesomeIcon className="likeIcon" icon={faThumbsUp} />
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
                    getRequestedPost.likes
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
                    getRequestedPost.dislikes
                  )}
                </p>
              </div>
              <div className="onePostContainer__footer">
                <h4 className="onePostContainer__footer__title">Comments</h4>
                {getRequestedPost.comments.map((comment, index) => {
                  // check if connected user is the commenter poster
                  const isUserComment =
                    userData._id === comment.commenterId ||
                    userData.isAdmin === 1

                  // handle function for updating comment
                  const updateComment = async (e) => {
                    e.preventDefault()

                    const commentData = {
                      commentId: comment._id,
                      commenterId: userData._id,
                      commenterFirstName: userData.firstName,
                      commenterLastName: userData.lastName,
                      commenterProfilePicture: userData.profilePicture,
                      text: commentUpdate,
                    }
                    try {
                      await articleServices.putComment(
                        getRequestedPost._id,
                        commentData
                      )
                      setCommentIsUpdated(!commentIsUpdated)
                      getArticles()
                    } catch (err) {
                      console.log(err)
                    }
                  }

                  // handle function for deleting comment
                  const deleteComment = async () => {
                    const deleteData = {
                      commentId: comment._id,
                    }
                    // eslint-disable-next-line no-restricted-globals
                    const confirmation = confirm('Delete comment ?')
                    if (confirmation) {
                      try {
                        await articleServices.deleteComment(
                          getRequestedPost._id,
                          deleteData
                        )
                        getArticles()
                      } catch (err) {
                        console.log(err)
                      }
                    }
                  }

                  return (
                    <ul key={index}>
                      <li className="onePostContainer__footer__commentContainer">
                        <div className="onePostContainer__footer__commentContainer__header">
                          <figure
                            aria-label="Photo de profil du créateur du commentaire"
                            className="onePostContainer__footer__commentContainer__header__fig"
                          >
                            <img
                              className="onePostContainer__footer__commentContainer__header__fig__img"
                              src={comment.commenterProfilePicture}
                              alt="user commenter"
                            />
                          </figure>
                          <h5 className="onePostContainer__footer__commentContainer__header__title">
                            {comment.commenterFirstName}{' '}
                            {comment.commenterLastName}
                          </h5>
                          {isUserComment && (
                            <div className="onePostContainer__footer__commentContainer__header__commentIcon">
                              <FontAwesomeIcon
                                onClick={() => {
                                  handleEditComment(comment._id)
                                }}
                                className="onePostContainer__footer__commentContainer__header__commentIcon--editIcon"
                                icon={faPenToSquare}
                                title="Edit post"
                              />
                              <FontAwesomeIcon
                                onClick={deleteComment}
                                className="onePostContainer__footer__commentContainer__header__commentIcon--deleteIcon"
                                icon={faTrashCan}
                                title="Delete post"
                              />
                            </div>
                          )}
                        </div>
                        <div className="onePostContainer__footer__commentContainer__body">
                          {(commentIsUpdated === false ||
                            targetElement !== comment._id) && (
                            <p className="onePostContainer__footer__commentContainer__body__message">
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
                      </li>
                    </ul>
                  )
                })}
                <CreateComment commentId={getRequestedPost._id} />
              </div>
            </div>
          </article>
        ) : (
          <FontAwesomeIcon
            icon={faSpinner}
            className="fa-spin fa-2x postFlow"
          />
        ))}
      <Footer />
    </>
  )
}
