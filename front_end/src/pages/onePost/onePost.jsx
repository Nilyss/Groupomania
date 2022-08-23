// libraries
import { useContext, useState, useEffect } from 'react'
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
import axios from 'axios'

// context
import { PostContext } from '../../context'

// components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

// css
import './_onePost.scss'
import CreateComment from '../../components/createComment/createComment'

export default function OnePost() {
  const { isLoading, getPosts, posts, users, user } = useContext(PostContext)

  const arrowIcon = (
    <Link to={'/home'}>
      <FontAwesomeIcon icon={faArrowLeft} className="previousArrowIcon" />
    </Link>
  )

  //axios config
  axios.defaults.withCredentials = true

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

  const getRequestedPost = posts.find((p) => p._id === params.id)

  // get the poster ID of article
  const userPoster = users.find((u) => u._id === getRequestedPost.posterId)

  // check if the connected user is the user poster of article or if it's an admin
  const isUserPost = user._id === userPoster._id || user.isAdmin === 1

  // Condition for showing like or dislike button, if the post was already disliked or liked
  const isLiked = getRequestedPost.likers.find(
    (likers) => likers.likerId === user._id
  )
  const isDisliked = getRequestedPost.disLikers.find(
    (dislikers) => dislikers.disLikerId === user._id
  )

  // dateFormat for Moment libraries
  const dateToFormat = `${getRequestedPost.createdAt}`

  // useEffect
  useEffect(() => {
    getPosts()
  }, [])

  // handle function

  const handleEditPost = (id) => {
    setIsUpdated(!isUpdated)
    setTargetElement(id)
  }

  const updateArticle = async (e) => {
    e.preventDefault()

    const data = {
      posterId: userPoster._id,
      message: messageUpdate,
    }
    await axios.put(
      `${process.env.REACT_APP_API_URL}articles/` + getRequestedPost._id,
      data
    )
    setIsUpdated(!isUpdated)
    getPosts()
  }

  const deletePost = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}articles/` + getRequestedPost._id
      )
      .then((res) => {
        if (res.status === 200) {
          navigate('/home', { replace: true })
        } else {
          console.log('error while redirect')
        }
      })
  }

  async function handleLike(e) {
    e.preventDefault()

    // if the user like an article
    if (
      !getRequestedPost.likers.find((likers) => likers.likerId === user._id)
    ) {
      const likeData = {
        like: 1,
        likerId: user._id,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}articles/` +
          getRequestedPost._id +
          '/like',
        likeData
      )
      getPosts()
    }
    // if the user unlike an article
    if (getRequestedPost.likers.find((likers) => likers.likerId === user._id)) {
      const unlikeData = {
        like: 0,
        likerId: user._id,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}articles/` +
          getRequestedPost._id +
          '/like',
        unlikeData
      )
      getPosts()
    }
  }

  async function handleDislike(e) {
    e.preventDefault()

    // if the user dislike an article
    if (
      !getRequestedPost.disLikers.find(
        (dislikers) => dislikers.disLikerId === user._id
      )
    ) {
      const dislikeData = {
        like: -1,
        disLikerId: user._id,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}articles/` +
          getRequestedPost._id +
          '/like',
        dislikeData
      )
      getPosts()
    }

    // if the user un dislike an article
    if (
      getRequestedPost.disLikers.find(
        (dislikers) => dislikers.disLikerId === user._id
      )
    ) {
      const undislikeData = {
        like: 0,
        disLikerId: user._id,
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}articles/` +
          getRequestedPost._id +
          '/like',
        undislikeData
      )
      getPosts()
    }
  }

  const handleEditComment = (id) => {
    setCommentIsUpdated(!commentIsUpdated)
    setTargetElement(id)
  }

  return (
    <>
      <Header />
      {arrowIcon}
      {users &&
        (getRequestedPost ? (
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
                <figure className="onePostContainer__header__fig">
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
                <figure className="onePostContainer__body__fig">
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
                    user._id === comment.commenterId || user.isAdmin === 1

                  // comment handle function

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
                        getRequestedPost._id +
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
                        getRequestedPost._id +
                        '/comment/delete',
                      data
                    )
                    await getPosts()
                  }

                  return (
                    <ul key={index}>
                      <li className="onePostContainer__footer__commentContainer">
                        <div className="onePostContainer__footer__commentContainer__header">
                          <figure className="onePostContainer__footer__commentContainer__header__fig">
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
