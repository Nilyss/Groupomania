// libraries
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faSpinner } from '@fortawesome/free-solid-svg-icons'

// context
import { PostContext } from '../../context'

// css
import './_usersList.scss'

export default function UsersList() {
  const { isLoading, usersData, userData } = useContext(PostContext)
  const [toggleMenu, setToggleMenu] = useState(false)

  const handleClick = () => {
    setToggleMenu(!toggleMenu)
  }

  // for accessibility if item is focus, by pressing space or enter, trigger the handleClick Function
  const keydown = (e) => {
    let code = e.which
    if (code === 13 || code === 32) {
      handleClick()
    }
  }

  return (
    <>
      <div className="userListContainer">
        <FontAwesomeIcon
          tabIndex="0"
          role="button"
          onKeyDown={keydown}
          onClick={handleClick}
          icon={faPeopleGroup}
          className="fa-2x navMenuModal__icon"
        />
        <p className="userListContainer__icon--title" onClick={handleClick}>
          Administrators list
        </p>
        {toggleMenu && (
          <>
            <div className="userListContainer__ul--alt">
              <ul className="userListContainer__ul">
                {usersData &&
                  usersData.map((userMap, index) => {
                    const isAdmin = userMap.isAdmin === 1
                    const isOnline = userMap._id === userData._id

                    return (
                      <li className="userListContainer__ul__list" key={index}>
                        {isLoading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="fa-spin fa-2x postFlow"
                          />
                        ) : (
                          isAdmin && (
                            <>
                              {isOnline ? (
                                <div className="online" title="is online"></div>
                              ) : (
                                <div
                                  className="offline"
                                  title="is offline"
                                ></div>
                              )}
                              <figure aria-label="Photo de profil de l'administrateur">
                                <img
                                  className="userListContainer__ul__list__img"
                                  src={userMap.profilePicture}
                                  alt="user profile"
                                />
                              </figure>
                              <h4 className="userListContainer__ul__list__name">
                                {userMap.firstName} {userMap.lastName}
                              </h4>
                            </>
                          )
                        )}
                      </li>
                    )
                  })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  )
}
