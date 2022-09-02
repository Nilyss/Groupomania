// libraries
import { useState, useEffect, createContext } from 'react'

// api
import ArticleServices from '../api/Services/ArticleServices'
import UserService from '../api/Services/UserService'
const articleServices = new ArticleServices()
const userServices = new UserService()

// init context
export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  // push API call into state
  const [usersData, setUsersData] = useState([])
  const [userData, setUserData] = useState([])
  const [articlesData, setArticlesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // *********** useEffect users ***********
  // get All the users
  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      const requestResponse = await userServices.getUser()
      setUsersData(requestResponse)
      setIsLoading(false)
    }
    getUsers()
  }, [])

  // get One user
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      const requestResponse = await userServices.getUserIdFromToken()
      setUserData(requestResponse)
      setIsLoading(false)
    }
    getUser()
  }, [])

  //  *********** useEffect articles ***********
  // get All articles
  useEffect(() => {
    const getAllArticles = async () => {
      setIsLoading(true)
      const requestResponse = await articleServices.getArticle()
      setArticlesData(requestResponse.reverse())
      setIsLoading(false)
    }
    getAllArticles()
  }, [])

  // function for dispatching DOM rendering on every new api call
  const getArticles = async () => {
    const dispatch = async () => {
      const requestResponse = await articleServices.getArticle()
      setArticlesData(requestResponse.reverse())
    }
    dispatch()
  }

  // function for dispatching DOM rendering on users api call
  const getUser = async () => {
    const dispatch = async () => {
      const requestResponse = await userServices.getUserIdFromToken()
      setUserData(requestResponse)
    }
    dispatch()
  }
  // function for dispatching DOM rendering on user api call
  const getUsers = async () => {
    const dispatch = async () => {
      const requestResponse = await userServices.getUser()
      setUsersData(requestResponse)
    }
    dispatch()
  }

  return (
    <PostContext.Provider
      value={{
        usersData,
        articlesData,
        userData,
        getArticles,
        getUser,
        getUsers,
        isLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
