import { useState, useEffect, createContext } from 'react'
import { getRequest } from '../api/apiCall'
import apiEndpoints from '../api/apiEndpoints'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  // push API call into state
  const [usersData, setUsersData] = useState([])
  const [displayUsersData, setDisplayUsersData] = useState(true)
  const [userData, setUserData] = useState([])
  const [displayUserData, setDisplayUserData] = useState(true)
  const [articlesData, setArticlesData] = useState([])
  const [displayArticlesData, setDisplayArticlesData] = useState(true)
  const [oneArticleData, setOneArticleData] = useState([])
  const [displayOneArticleData, setDisplayOneArticleData] = useState(true)

  const [isLoading, setIsLoading] = useState(true)

  // useEffect users
  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      const axiosResponse = await getRequest(apiEndpoints.getAllUsers)
      if (axiosResponse.status === 200) {
        setUsersData(axiosResponse.data)
        setIsLoading(false)
      } else {
        setDisplayUsersData(false)
      }
    }
    getUsers()
  }, [])

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
      } else {
        setDisplayUserData(false)
      }
    }
    getUser()
  }, [])

  // useEffect articles
  useEffect(() => {
    const getAllArticles = async () => {
      setIsLoading(true)
      const axiosResponse = await getRequest(apiEndpoints.getAllArticles)
      if (axiosResponse.status === 200) {
        setArticlesData(axiosResponse.data.reverse())
        setIsLoading(false)
      } else {
        setDisplayArticlesData(false)
      }
    }
    getAllArticles()
  }, [])

  useEffect(() => {
    const getOneArticle = async () => {
      setIsLoading(true)
      await articlesData.forEach((e) => {
        getRequest(apiEndpoints.getAllArticles + '/' + e._id).then((res) => {
          if (res.status === 200) {
            setOneArticleData(res.data)
            setIsLoading(false)
          } else {
            setDisplayOneArticleData(false)
          }
        })
      })
    }
    getOneArticle()
  }, [])

  const getArticles = async () => {
    const getNewPost = async () => {
      const axiosResponse = await getRequest(apiEndpoints.getAllArticles)
      if (axiosResponse.status === 200) {
        setArticlesData(axiosResponse.data.reverse())
      }
    }
    getNewPost()
  }
  const getOnePost = async () => {}

  const getUsers = async () => {}

  const getUser = async () => {}

  return (
    <PostContext.Provider
      value={{
        usersData,
        articlesData,
        userData,
        oneArticleData,
        isLoading,
        getUsers,
        getUser,
        getArticles,
        getOnePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
