
import BlogForm from './components/BlogForm'
import Blogs from './components/Blog'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'

import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      console.log(user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

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

export default App