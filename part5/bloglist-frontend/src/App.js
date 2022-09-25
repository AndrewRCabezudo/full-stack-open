import { useState, useEffect } from 'react'
import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
    title: <input value={blogtitle} onChange={handleTitleChange} />
    <br/>
    author: <input value={blogauthor} onChange={handleAuthorChange} />
    <br/>
    url:  <input value={blogurl} onChange={handleUrlChange} />
    <br/> <button type="submit">create</button>
    </form>

  )
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
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
    console.log(blogObject)
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

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>


      { user === null ? loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div> 
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
