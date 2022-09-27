import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState({})
  const [blogtitle, setBlogTitle] = useState('')
  const [blogauthor, setBlogAuthor] = useState('')
  const [blogurl, setBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setUsername('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: blogauthor,
      title: blogtitle,
      url: blogurl,
    }
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setSuccessMessage(`a new blog ${blogtitle} by ${blogauthor} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // empty localstorage completely
    // window.localStorage.clear()
  }

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>

      { user === null ? 
        <Togglable buttonLabel='login'>
          <LoginForm 
            username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)} handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <Logout user={user.name} handleSubmit={handleLogout}/>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm 
              onSubmit={addBlog} title={blogtitle} titleChange={handleTitleChange}
              author={blogauthor} authorChange={handleAuthorChange}
              url={blogurl} urlChange={handleUrlChange}
            />
          </Togglable>
        </div> 
      }
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
