// libraries
import { Link } from 'react-router-dom'

//css
import './_header.scss'

// images
import logoOrange from '../../assets/orange_logo.png'
import { useContext, useEffect } from 'react'
import { PostContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const { isLoading, getUser, user } = useContext(PostContext)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <header className="homeHeader">
        <div className="showUser">
          <figure>
            {isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="fa-spin fa-2x showUser__pp"
              />
            ) : (
              <Link to={'/home'}>
                <img
                  className="showUser__pp"
                  src={user.profilePicture}
                  alt="profile"
                  title={user.firstName + "'s home page"}
                />
              </Link>
            )}
          </figure>
          <p className="showUser__name">Welcome {user.firstName} !</p>
        </div>
        <figure className="homeMain__fig">
          <img
            className="homeMain__fig__logo"
            src={logoOrange}
            alt="logo Groupomania"
          />
        </figure>
      </header>
    </>
  )
}
