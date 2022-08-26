// api
import { postRequest } from '../../api/apiCall'
import apiEndpoints from '../../api/apiEndpoints'

// css
import './_createComment.scss'

// context
import { PostContext } from '../../context'
import { useContext } from 'react'

export default function CreateComment({ commentId }) {
  // init hooks
  const { getArticles, userData } = useContext(PostContext)

  // create comment form submit
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
      const axiosResponse = await postRequest(
        apiEndpoints.getAllArticles +
          '/' +
          commentId +
          apiEndpoints.postComment,
        data
      )
      if (axiosResponse.status === 201) {
        e.target['commentMessage'].value = ''
        await getArticles()
      }
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
