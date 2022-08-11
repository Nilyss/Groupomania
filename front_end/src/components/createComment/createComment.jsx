// librairies
import { useEffect } from 'react'
import axios from 'axios'

// css
import './_createComment.scss'

// context
import { PostContext } from '../../context'
import { useContext } from 'react'

export default function CreateComment({ commentId }) {
  axios.defaults.withCredentials = true

  const { getPosts, getOnePost, getUser, user } = useContext(PostContext)

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
      await getUser()
    }
    fetchData()
  }, [])

  async function handleFormComment(e) {
    e.preventDefault()

    const data = {
      commenterId: user._id,
      commenterFirstName: user.firstName,
      commenterLastName: user.lastName,
      commenterProfilePicture: user.profilePicture,
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
    await getPosts()
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
