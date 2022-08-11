// libraries
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// context
import { PostContext } from '../../context'

// css
import './_usersList.scss'

export default function UsersList() {
  const { isLoading, users } = useContext(PostContext)

  return (
    <>
      <div className="userListContainer">
        <h3 className="userListContainer__Title">Users list</h3>
        <ul className="userListContainer__ul">
          {users.map((user, index) => {
            return (
              <li className="userListContainer__ul__list" key={index}>
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="fa-spin fa-2x postFlow"
                  />
                ) : (
                  <>
                    <figure>
                      <img
                        className="userListContainer__ul__list__img"
                        src={user.profilePicture}
                        alt="user profile"
                      />
                    </figure>
                    <h4 className="userListContainer__ul__list__name">
                      {user.firstName} {user.lastName}
                    </h4>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
