// libraries
import { Link } from 'react-router-dom'

//css
import './_header.scss'

// images
import logoOrange from '../../assets/orange_logo.png'
import { useContext } from 'react'
import { PostContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const { userData, isLoading } = useContext(PostContext)

  return (
    <>
      <header className="homeHeader">
        <div className="homeHeaderContainer">
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
                    src={userData.profilePicture}
                    alt="profile"
                    title={userData.firstName + "'s home page"}
                  />
                </Link>
              )}
            </figure>
            <p className="showUser__name">Welcome {userData.firstName} !</p>
          </div>
          <figure className="homeMain__fig">
            <Link to={'/home'}>
              <img
                className="homeMain__fig__logo"
                src={logoOrange}
                alt="logo Groupomania"
              />
            </Link>
          </figure>
        </div>
      </header>
    </>
  )
}
