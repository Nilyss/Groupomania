// librairies
import axios from 'axios'

// css
import './_createComment.scss'

// context
import { PostContext } from '../../context'
import { useContext } from 'react'

export default function CreateComment({ commentId }) {
  axios.defaults.withCredentials = true

  const { getArticles, userData } = useContext(PostContext)

  async function handleFormComment(e) {
    e.preventDefault()

    const data = {
      commenterId: userData._id,
      commenterFirstName: userData.firstName,
      commenterLastName: userData.lastName,
      commenterProfilePicture: userData.profilePicture,
      text: e.target['commentMessage'].value,
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}articles/` + commentId + '/comment',
        data
      )
    } catch (error) {
      console.log(error)
    }
    e.target['commentMessage'].value = ''
    await getArticles()
  }

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
