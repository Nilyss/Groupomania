// libraries
import { useEffect, useContext } from 'react'

// components
import { PostContext } from '../../context'

// css
import './_onePost.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function OnePost() {
  const { isLoading } = useContext(PostContext)

  const queryParams = new URLSearchParams(window.location.search)
  const postId = queryParams.get('id')

  console.log('queryParams =>', queryParams)
  console.log('postId =>', postId)

  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-2x postFlow" />
      ) : (
        <h1>Post Id =>{postId}</h1>
      )}
    </>
  )
}
