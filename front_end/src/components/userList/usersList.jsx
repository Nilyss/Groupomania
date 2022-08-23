// libraries
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// context
import { PostContext } from '../../context'

// css
import './_usersList.scss'

export default function UsersList() {
  const { isLoading, users, user } = useContext(PostContext)

  return (
    <>
      <div className="userListContainer">
        <h3 className="userListContainer__Title">Administrators</h3>
        <ul className="userListContainer__ul">
          {users &&
            users.map((userMap, index) => {
              const isAdmin = userMap.isAdmin === 1
              const isOnline = userMap._id === user._id

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
                          <div className="offline" title="is offline"></div>
                        )}
                        <figure>
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
  )
}
