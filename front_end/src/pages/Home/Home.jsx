// Components
import Header from '../../components/header/header'
import CreatePost from '../../components/createPost/createPost'
import ArticleFlow from '../../components/articleFlow/articleFlow'

// css
import './_home.scss'

export default function Home() {
  return (
    <>
      <Header />
      <main className="homeMain">
        <section className="sectionMain">
          <CreatePost />
          <ArticleFlow />
        </section>
      </main>
    </>
  )
}
