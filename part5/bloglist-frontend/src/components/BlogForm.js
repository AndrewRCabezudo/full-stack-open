
const BlogForm = (props) => {
  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={props.onSubmit}>
        title: <input value={props.title} onChange={props.titleChange} />
        <br/>
        author: <input value={props.author} onChange={props.authorChange} />
        <br/>
        url:  <input value={props.url} onChange={props.urlChange} />
        <br/> <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm