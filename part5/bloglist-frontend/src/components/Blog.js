import { useState } from 'react'

const Blog = ({ blog, addLike, remove, handleRemove }) => {
  const [clicked, setClicked] = useState(false)
  const [buttonName, setButtonName] = useState('view')
  const [isHovering, setIsHovering] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <div>
      {blog.title} <button onClick={handleClick} style={{ marginLeft: '.5rem' }}>{buttonName}</button>
      <br />
      {blog.url}
      <br />
      likes: {blog.likes}<button onClick={addLike} style={{ marginLeft: '.5rem' }}>like</button>
      <br />
      {blog.author}
      <br />
      {remove && <button onClick={handleRemove} style={{ backgroundColor: isHovering ? '#ad1457' : '#e91e63', borderRadius: 5, color: 'whitesmoke' }}  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} value={blog.id}>remove</button>}
    </div>
  )
  const collapsedBlog = () => (
    <div>
      {blog.title} <button onClick={handleClick} style={{ marginLeft: '.5rem' }}>{buttonName}</button>
      <br /> <br />
    </div>
  )

  return(
    <div style={blogStyle}>
      { clicked === false  ? collapsedBlog() :  expandedBlog() }
    </div>
  )
}

export default Blog