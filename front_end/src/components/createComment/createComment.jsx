// css
import './_createComment.scss'

// context
import { PostContext } from '../../context'
import { useContext } from 'react'

// api
import ArticleServices from '../../api/Services/ArticleServices'
const articleServices = new ArticleServices()

export default function CreateComment({ commentId }) {
  // init hooks
  const { getArticles, userData } = useContext(PostContext)

  // create comment form submit
  async function handleFormComment(e) {
    e.preventDefault()

    const commentData = {
      commenterId: userData._id,
      commenterFirstName: userData.firstName,
      commenterLastName: userData.lastName,
      commenterProfilePicture: userData.profilePicture,
      text: e.target['commentMessage'].value,
    }
    try {
      await articleServices.postComment(commentId, commentData)
      e.target['commentMessage'].value = ''
      getArticles()
    } catch (error) {
      console.log(error)
    }
  }

  // rendering DOM
  return (
    <>
      <form onSubmit={handleFormComment} className="comment__form">
        <label htmlFor="postComment" className="comment__form__label">
          Comment it :
        </label>
        <input
          id="postComment"
          name="commentMessage"
          className="comment__form__input"
          type="text"
        />
        <button type="submit" className="comment__form__button">
          Comment
        </button>
      </form>
    </>
  )
}
