//css
import './_postFlow.scss'
import testImg from './panpan.jpg'
import testPP from '../createPost/testPP.webp'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PostFlow() {
  const likeIcon = <FontAwesomeIcon icon={faThumbsUp} size="1x" />

  return (
    <>
      <article className="postFlow">
        <div className="postFlow__container">
          <div className="postFlow__container__header">
            <figure className="createPost__body__form__top__fig">
              <img
                className="createPost__body__form__top__fig__img"
                src={testPP}
                alt="profile pictures"
              />
            </figure>
            <h5 className="postFlow__container__title">Rick DECKARD</h5>
          </div>
          <figure className="postFlow__container__figure">
            <img
              className="postFlow__container__figure__img"
              src={testImg}
              alt="redux schema"
            />
          </figure>
          <div className="postFlow__container__body">
            <p className="postFlow__container__body__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto delectus error iusto repellat rerum sapiente sunt,
              veniam! Accusantium, at dignissimos enim error laboriosam magnam
              nisi perferendis praesentium. A alias aliquam aliquid corporis
              dolorem expedita facilis impedit laudantium magni odit perferendis
              perspiciatis provident quam qui quia quidem, quis quos repellendus
              repudiandae rerum suscipit tempore temporibus totam ullam
              voluptas? Et in ipsam mollitia omnis placeat quos, tenetur ullam!
              Ad, autem blanditiis deserunt dolorem dolores excepturi impedit
              iusto maiores officiis veritatis vitae voluptates. Alias amet
              animi asperiores beatae delectus, dicta dolorem eligendi est
              labore molestiae quas repudiandae saepe ullam unde vel vero
              voluptatum!
            </p>
          </div>
          <div className="postFlow__container__footer">
            <span className="postFlow__container__footer__like">
              {likeIcon}
            </span>
            <h6 className="postFlow__container__footer__title">Comments :</h6>
            <p className="postFlow__container__footer__comment">
              Exemple: i'm an incredible comment
            </p>
            <p className="postFlow__container__footer__comment">
              Exemple: i'm an incredible comment
            </p>
            <label
              htmlFor="comment"
              className="postFlow__container__footer__label"
            >
              Comment it:
            </label>
            <input
              id="comment"
              className="postFlow__container__footer__input"
              type="text"
            />
            <button
              className="postFlow__container__footer__submit"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </article>
    </>
  )
}
