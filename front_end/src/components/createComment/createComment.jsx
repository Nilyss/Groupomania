// librairies
import { useEffect } from 'react'
import axios from 'axios'

// css
import './_createComment.scss'

// context
import { PostContext } from '../../context'
import { useContext } from 'react'

export default function CreateComment() {
  axios.defaults.withCredentials = true

  const { getPosts, getOnePost, post, getUser, user } = useContext(PostContext)

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    getOnePost()
  }, [])

  useEffect(() => {
    getUser()
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
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}articles/` + post._id + '/comment',
          data
        )
        .then((res) => {
          console.log(res.status)
        })
    } catch (error) {
      console.log(error)
    }
    getPosts()
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
