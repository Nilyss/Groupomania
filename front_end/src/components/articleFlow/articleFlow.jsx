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
  const [loadArticle, setLoadArticle] = useState(true)

  useEffect(() => {
    if (loadArticle) {
      dispatch(getArticles())
      setLoadArticle(false)
    }
  }, [loadArticle, dispatch])

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
