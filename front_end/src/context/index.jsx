import axios from 'axios'
import { useState, createContext } from 'react'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}articles`)
    setPosts(res.data)
    setIsLoading(false)
  }

  return (
    <PostContext.Provider value={{ getPosts, posts, isLoading }}>
      {children}
    </PostContext.Provider>
  )
}
