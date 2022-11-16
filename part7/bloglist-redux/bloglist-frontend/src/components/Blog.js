import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, setBlogs } from '../reducers/blogReducer'
import { setErrorNotification, setSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

import {
  Link,
  useParams
} from 'react-router-dom'

const Blog = ({ blog, addLike, remove, handleRemove }) => {
  const [isHovering, setIsHovering] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'none',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }


  const expandedBlog = () => (
    <div className='blog'>
      <h1>
        {blog.title} {blog.author}
      </h1>{' '}
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes</span>
      <button
        id='like-button'
        onClick={addLike}
        style={{ marginLeft: '.5rem' }}
      >
        like
      </button>
      <br />
      added by {blog.user.name}
      <br />
      {remove && (
        <button
          id='remove-button'
          onClick={handleRemove}
          style={{
            backgroundColor: isHovering ? '#ad1457' : '#e91e63',
            borderRadius: 5,
            color: 'whitesmoke',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value={blog.id}
        >
          remove
        </button>
      )}
    </div>
  )

  return (
    <div style={blogStyle}>
      {expandedBlog()}
    </div>
  )
}

const Blogs = ({ id }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    blogService
      .remove(event.target.value)
    dispatch(setBlogs(blogs.filter(b => b.id !== event.target.value)))
    dispatch(setSuccessNotification('blog was removed'))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, 5000)
  }

  const updateLikes = (blog) => {
    dispatch(addLikeToBlog(blog.id))
    const like = blog.likes + 1
    const updatedBlog = { ...blog, likes: like }

    blogService
      .update(blog.id, updatedBlog)
      .catch(() => {
        dispatch(setErrorNotification(`problem updating blog ${blog.title} by ${blog.author}`))
        setTimeout(() => {
          dispatch(clearNotification(''))
        }, 5000)
      })
    dispatch(setSuccessNotification(`blog ${blog.title} by ${blog.author} was liked`))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, 5000)
  }

  if (isNaN(id)) {
    return(
      <div>
        {  blogs.slice().sort((a,b) => b.likes - a.likes).map(blog => {
          return (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{' '}</Link>
            </div>)}
        )}
      </div>
    )
  } else {
    const blogId = useParams().id
    const blog = blogs.find(b => b.id === blogId)
    if (!blog) {
      return (
        <Blogs />
      )
    }

    let remove = blog.user.username === user.username ? true : false
    return (
      <div>
        <Blog key={blog.id} blog={blog} addLike={() => updateLikes(blog)} remove={remove} handleRemove={handleDelete} />
      </div>
    )
  }
}

export default Blogs