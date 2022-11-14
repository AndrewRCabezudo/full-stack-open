import { useSelector } from 'react-redux'

const Logout = () => {
  const user = useSelector(state => state.user)
  console.log(user)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      { user === '' ?
        <div></div>
        :
        <div>
          <form onSubmit={handleLogout}>
            {user.name} logged-in
            <button id='logout-button' type="submit" style={{ marginLeft: '.5rem' }}>logout</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Logout