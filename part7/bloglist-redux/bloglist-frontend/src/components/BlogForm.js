import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

// import { TextField, Button } from '@mui/material'


const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility()

    event.preventDefault()
    const blogObject = {
      author: event.target[0].value,
      title: event.target[1].value,
      url: event.target[2].value,
    }
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
    dispatch(setSuccessNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, 5000)
  }

  return (
    <div>
      <h2>Create a new blog entry</h2>

      {/* <form onSubmit={addBlog}>
        <div>
          <TextField label="title" />
        </div>
        <div>
          <TextField label="author" />
        </div>
        <div>
          <TextField label="url" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            create
          </Button>
        </div>
      </form> */}

      <form onSubmit={addBlog}>
        title:{' '}
        <input data-testid='title' />
        <br />
        author:{' '}
        <input data-testid='author' />
        <br />
        url:{' '}
        <input data-testid='url' />
        <br />{' '}
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}
export default BlogForm
