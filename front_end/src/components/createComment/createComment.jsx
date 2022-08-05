// css
import './_createComment.scss'

export default function CreateComment() {
  return (
    <>
      <form className="comment__form" action="">
        <input className="comment__form__input" type="text" />
        <button type="submit" className="comment__form__button">
          Comment
        </button>
      </form>
    </>
  )
}
