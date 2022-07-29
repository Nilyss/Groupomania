// dependencies
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// styles
import './_articleFlow.scss'

// actions
import { getArticles } from '../../redux/actions/articleActions'

// components
import Card from '../card/card'

export default function ArticleFlow() {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articleReducer)
  const [loadPost, setLoadPost] = useState(true)

  useEffect(() => {
    if (loadPost) {
      dispatch(getArticles())
      setLoadPost(false)
    }
  }, [loadPost, dispatch])

  if (!(typeof articles === 'object' && Object.keys(articles).length === 0)) {
    return (
      <ul>
        {articles.map((article) => {
          return <Card article={article} key={article._id} />
        })}
      </ul>
    )
  }
}
