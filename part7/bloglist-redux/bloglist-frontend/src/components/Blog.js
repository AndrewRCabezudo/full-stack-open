import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeToBlog, setBlogs } from '../reducers/blogReducer'
import { setErrorNotification, setSuccessNotification, clearNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'


const Blog = ({ blog, addLike, remove, handleRemove }) => {
  const [clicked, setClicked] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const [isHovering, setIsHovering] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleClick = () => {
    setClicked(!clicked)
    if (buttonName === 'view') {
      setButtonName('hide')
    } else {
      setButtonName('view')
    }
  }

  const expandedBlog = () => (
    <div className='blog'>
      <span>
        {blog.title} {blog.author}
      </span>{' '}
      <button onClick={handleClick} style={{ marginLeft: '.5rem' }}>
        {buttonName}
      </button>
      <br />
      <span>{blog.url}</span>
      <br />
      <span>likes {blog.likes}</span>
      <button
        id='like-button'
        onClick={addLike}
        style={{ marginLeft: '.5rem' }}
      >
        like
      </button>
      <br />
      {blog.user.name}
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
  const collapsedBlog = () => (
    <div className='blog'>
      {blog.title} {blog.author}{' '}
      <button onClick={handleClick} style={{ marginLeft: '.5rem' }}>
        {buttonName}
      </button>
      <br /> <br />
    </div>
  )

  return (
    <div style={blogStyle}>
      {clicked === false ? collapsedBlog() : expandedBlog()}
    </div>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

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

  return(
    <div>
      { user === '' ?
        <div>
          { blogs.slice().sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={() => updateLikes(blog)} remove={false}/>)}
        </div>
        :
        <div>
          {  blogs.slice().sort((a,b) => b.likes - a.likes).map(blog => {
            let remove = blog.user.username === user.username ? true : false
            return (
              <Blog key={blog.id} blog={blog} addLike={() => updateLikes(blog)} remove={remove} handleRemove={handleDelete} />)}
          )}
        </div>
      }
    </div>
  )
}


export default Blogs