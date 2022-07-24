//css
import './_postFlow.scss'
import testImg from './panpan.jpg'
import testPP from '../createPost/testPP.webp'

export default function PostFlow() {
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
        </div>
      </article>
    </>
  )
}
