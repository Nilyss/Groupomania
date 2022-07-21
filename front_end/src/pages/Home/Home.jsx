// Components
import Header from '../../components/header/header'
import NavMenu from '../../components/navMenu/navMenu'
import CreatePost from '../../components/createPost/createPost'
import PostFlow from '../../components/postFlow/postFlow'
import UserList from '../../components/userList/userList'

// css
import './_home.scss'

export default function Home() {
  return (
    <>
      <Header />
      <main className="homeMain">
        <section className="sectionNavMenu">
          <NavMenu />
        </section>
        <section className="sectionMain">
          <CreatePost />
          <PostFlow />
          <PostFlow />
          <PostFlow />
          <PostFlow />
          <PostFlow />
        </section>
        <section className="sectionUserList">
          <UserList />
        </section>
      </main>
    </>
  )
}
