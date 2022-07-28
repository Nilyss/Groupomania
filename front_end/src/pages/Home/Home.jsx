import { Link } from 'react-router-dom'
import { UidContext } from '../../context/appContext'
import { useContext } from 'react'

// Components
import Header from '../../components/header/header'
// import NavMenu from '../../components/navMenu/navMenu'
// import UserList from '../../components/userList/userList'
import CreatePost from '../../components/createPost/createPost'
import PostFlow from '../../components/postFlow/postFlow'

// css
import './_home.scss'

export default function Home() {
  const uid = useContext(UidContext)
  return (
    <>
      <Header />
      <main className="homeMain">
        <section className="sectionNavMenu">
          {/*{uid && <h1>utilisateur{uid}</h1>}*/}
          {/*<NavMenu />*/}
          <Link to="/">Back</Link>
        </section>
        <section className="sectionMain">
          <CreatePost />
          <PostFlow />
          <PostFlow />
          <PostFlow />
          <PostFlow />
          <PostFlow />
        </section>
        <section className="sectionUserList">{/*<UserList />*/}</section>
      </main>
    </>
  )
}
