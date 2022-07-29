// dependencies
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Card = ({ article }) => {
  const [isLoading, setIsLoading] = useState(true)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)

  const dataLoad = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  }

  useEffect(() => {
    !dataLoad(usersData[0]) && setIsLoading(false)
  }, [usersData])

  return (
    <>
      <li className="cardContainer" key={article._id}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x" />
        ) : (
          <article className="postFlow">
            <div className="postFlow__container">
              <div className="postFlow__container__header">
                <figure className="createPost__body__form__top__fig">
                  <img
                    className="createPost__body__form__top__fig__img"
                    src={
                      !dataLoad(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === article.posterId) {
                            return user.profilePicture
                          }
                        })
                        .join('')
                    }
                    alt="profile"
                  />
                </figure>
                <h5 className="postFlow__container__title">
                  {!dataLoad(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === article.posterId) {
                        return user.firstName
                      }
                    })}{' '}
                  {!dataLoad(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === article.posterId) {
                        return user.lastName
                      }
                    })}
                </h5>
              </div>
              <figure className="postFlow__container__figure">
                <img className="postFlow__container__figure__img" alt="" />
              </figure>
              <div className="postFlow__container__body">
                <p className="postFlow__container__body__text">
                  {article.message}
                </p>
              </div>
              {/*<div className="postFlow__container__footer">*/}
              {/*  <span className="postFlow__container__footer__like"></span>*/}
              {/*  <h6 className="postFlow__container__footer__title">*/}
              {/*    Comments :*/}
              {/*  </h6>*/}
              {/*  <p className="postFlow__container__footer__comment">*/}
              {/*    Exemple: i'm an incredible comment*/}
              {/*  </p>*/}
              {/*  <p className="postFlow__container__footer__comment">*/}
              {/*    Exemple: i'm an incredible comment*/}
              {/*  </p>*/}
              {/*  <label*/}
              {/*    htmlFor="comment"*/}
              {/*    className="postFlow__container__footer__label"*/}
              {/*  >*/}
              {/*    Comment it:*/}
              {/*  </label>*/}
              {/*  <input*/}
              {/*    id="comment"*/}
              {/*    className="postFlow__container__footer__input"*/}
              {/*    type="text"*/}
              {/*  />*/}
              {/*  <button*/}
              {/*    className="postFlow__container__footer__submit"*/}
              {/*    type="submit"*/}
              {/*  >*/}
              {/*    Send*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          </article>
        )}
      </li>
    </>
  )
}

export default Card
