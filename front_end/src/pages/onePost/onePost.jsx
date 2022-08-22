// libraries
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import axios from 'axios'

export default function OnePost() {
  const { isLoading, posts, user, getUsers, users } = useContext(PostContext)

  const arrowIcon = (
    <Link to={'/home'}>
      <FontAwesomeIcon icon={faArrowLeft} className="previousArrowIcon" />
    </Link>
  )

  // useParams hook from react router dom for extract post id requested
  let params = useParams()

  // useState section
  // post edit state
  const [isUpdated, setIsUpdated] = useState(false)
  const [targetElement, setTargetElement] = useState('')
  const [messageUpdate, setMessageUpdate] = useState(null)

  // comment edit state
  const [commentIsUpdated, setCommentIsUpdated] = useState(false)
  const [commentUpdate, setCommentUpdate] = useState(null)

  // useEffect section
  useEffect(() => {
    getUsers()
  }, [])

  const getRequestedPost = posts.find((p) => p._id === params.id)

  // get the poster ID of article
  const userPoster = users.find((u) => u._id === getRequestedPost.posterId)

  // Condition for deletion and editing post
  const isUserPost = user._id === userPoster._id || user.isAdmin === 1

  // Condition for showing like or dislike button, if the post was already disliked or liked
  const isLiked = getRequestedPost.likers.find(
    (likers) => likers.likerId === user._id
  )
  const isDisliked = getRequestedPost.disLikers.find(
    (dislikers) => dislikers.disLikerId === user._id
  )

  // format date for Moment libraries
  const dateToFormat = `${getRequestedPost.createdAt}`

  // handle function
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
    }
  }

  return (
    <>
      <Header />
      {arrowIcon}
      {users &&
        (getRequestedPost ? (
          <>
            <article className="postFlow">
              <div className="postFlow__container">
                <div className="postFlow__container__header">
                  <div className="postFlow__container__header__iconContainer">
                    {isUserPost && (
                      <>
                        <FontAwesomeIcon
                          onClick={''}
                          className="postFlow__container__header__iconContainer__icon"
                          icon={faPenToSquare}
                          title="Edit post"
                        />
                        <FontAwesomeIcon
                          onClick={''}
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
                  <Link to={`/post/${getRequestedPost._id}`} className="link">
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
                    src={getRequestedPost.picture}
                    alt=""
                  />
                </figure>
                <div className="postFlow__container__body">
                  {(isUpdated === false ||
                    targetElement !== getRequestedPost._id) && (
                    <p className="postFlow__container__body__text">
                      {getRequestedPost.message}
                    </p>
                  )}
                  {isUpdated === true &&
                    targetElement === getRequestedPost._id && (
                      <div className="updatePost">
                        <textarea
                          className="updatePost__textarea"
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
                <h4 className="postFlow__container__commentTitle">Comments</h4>
              </div>
            </article>
          </>
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
