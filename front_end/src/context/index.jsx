import axios from 'axios'
import { useState, createContext, useEffect } from 'react'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = async () => {
    setIsLoading(true)
    const res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}articles`,
      headers: { 'Content-Type': 'application/json' },
    })
    res.data.reverse()
    setPosts(res.data)
    setIsLoading(false)
  }

  const getOnePost = () => {
    setIsLoading(true)
    posts.forEach((e) => {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}articles/` + e._id,
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        setPost(res.data)
        console.log(res.data)
      })
    })
    setIsLoading(false)
  }

  const getUsers = async () => {
    setIsLoading(true)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}users`)
    setUsers(res.data)
    setIsLoading(false)
  }

  const getUser = async () => {
    setIsLoading(true)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}jwtid`)
    const getUser = await axios.get(
      `${process.env.REACT_APP_API_URL}users/` + res.data
    )
    setUser(getUser.data)
    setIsLoading(false)
  }

  return (
    <PostContext.Provider
      value={{
        isLoading,
        getUsers,
        users,
        getUser,
        user,
        getPosts,
        posts,
        getOnePost,
        post,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
