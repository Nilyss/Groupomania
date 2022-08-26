// libraries
import { useState, useEffect, createContext } from 'react'

// api
import { getRequest } from '../api/apiCall'
import apiEndpoints from '../api/apiEndpoints'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  // push API call into state
  const [usersData, setUsersData] = useState([])
  const [userData, setUserData] = useState([])
  const [articlesData, setArticlesData] = useState([])
  const [oneArticleData, setOneArticleData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // *********** useEffect users ***********
  // get All the users
  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      const axiosResponse = await getRequest(apiEndpoints.getAllUsers)
      if (axiosResponse.status === 200) {
        setUsersData(axiosResponse.data)
        setIsLoading(false)
      }
    }
    getUsers()
  }, [])

  // get One user
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      const axiosResponse = await getRequest(apiEndpoints.getIdCurrentUser)
      const idUserResponse = await getRequest(
        apiEndpoints.getAllUsers + '/' + axiosResponse.data
      )
      if (idUserResponse.status === 200) {
        setUserData(idUserResponse.data)
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  //  *********** useEffect articles ***********
  // get All articles
  useEffect(() => {
    const getAllArticles = async () => {
      setIsLoading(true)
      const axiosResponse = await getRequest(apiEndpoints.getAllArticles)
      if (axiosResponse.status === 200) {
        setArticlesData(axiosResponse.data.reverse())
        setIsLoading(false)
      }
    }
    getAllArticles()
  }, [])

  // get One article
  useEffect(() => {
    const getOneArticle = async () => {
      setIsLoading(true)
      await articlesData.forEach((e) => {
        getRequest(apiEndpoints.getAllArticles + '/' + e._id).then((res) => {
          if (res.status === 200) {
            setOneArticleData(res.data)
            setIsLoading(false)
          }
        })
      })
    }
    getOneArticle()
  }, [])

  // function for dispatching DOM rendering on every new api call
  const getArticles = async () => {
    const dispatch = async () => {
      const axiosResponse = await getRequest(apiEndpoints.getAllArticles)
      if (axiosResponse.status === 200) {
        setArticlesData(axiosResponse.data.reverse())
      }
    }
    dispatch()
  }

  return (
    <PostContext.Provider
      value={{
        usersData,
        articlesData,
        userData,
        oneArticleData,
        getArticles,
        isLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
