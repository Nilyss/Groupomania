// libraries
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// Components
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import CreatePost from '../../components/createPost/createPost'
import ArticleFlow from '../../components/articleFlow/articleFlow'
import UsersList from '../../components/userList/usersList'
import NavMenu from '../../components/navMenu/navMenu'

// css
import './_home.scss'
import { useContext } from 'react'
import { UidContext } from '../../context/userIdContext'

export default function Home() {
  // const navigate = useNavigate()
  const uid = useContext(UidContext)

  useEffect(() => {
    if (!uid) {
      window.location.replace('/')
    }
  }, [])

  return (
    <>
      <Header />
      <main className="homeMain">
        <section className="sectionNavMenu">
          <NavMenu />
        </section>
        <section className="sectionMain">
          <CreatePost />
          <ArticleFlow />
        </section>
        <section className="sectionUserList">
          <UsersList />
        </section>
      </main>
      <Footer />
    </>
  )
}
