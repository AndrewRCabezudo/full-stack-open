import { useSelector } from 'react-redux'

const Logout = () => {
  const user = useSelector(state => state.user)
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
            <br />
            <br />
            <button id='logout-button' type="submit" style={{ marginLeft: '0rem' }}>logout</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Logout