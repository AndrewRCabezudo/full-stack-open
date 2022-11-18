
import BlogForm from './components/BlogForm'
import Blogs from './components/Blog'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import blogService from './services/blogs'
import userService from './services/users'

import { Container } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])


  const blogFormRef = useRef()

  const padding = {
    padding: 5
  }

  const User = ({ users }) => {
    const id = useParams().id
    const user = users.find(n => n.id === id)
    const blogs = useSelector(state => state.blogs)


    if (!user) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map(blog => {
            const blogToShow = blogs.find(b => b.id === blog.id)
            return (
              <li key={blog.id}>
                {blogToShow.title}
              </li>
            )
          }
          )}
        </ul>
      </div>
    )
  }

  const Users = ({ users }) => {
    return (
      <div>
        <h2>Users</h2>
        <h4>blogs created</h4>
        <ul>
          {users.map(user =>
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>  {user.blogs.length}
            </li>
          )}
        </ul>
      </div>
    )
  }

  const Home = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Logout />
        {user === ''
          ? <Togglable buttonLabel='login'>  <LoginForm /> </Togglable>
          : <Togglable buttonLabel='create new blog' ref={blogFormRef}>  <BlogForm blogFormRef={blogFormRef}/> </Togglable>
        }
        <Blogs />
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
        </div>

        <Routes>
          <Route path="/blogs/:id" element={<Blogs id={1}/>} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path='/users' element={<Users users={users} />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App