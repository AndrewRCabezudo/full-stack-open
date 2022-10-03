import {  useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogtitle, setBlogTitle] = useState('')
  const [blogauthor, setBlogAuthor] = useState('')
  const [blogurl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: blogauthor,
      title: blogtitle,
      url: blogurl,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        title: <input value={blogtitle} onChange={handleTitleChange} />
        <br/>
        author: <input value={blogauthor} onChange={handleAuthorChange} />
        <br/>
        url:  <input value={blogurl} onChange={handleUrlChange} />
        <br/> <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm