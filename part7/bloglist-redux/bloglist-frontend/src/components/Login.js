import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { setErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'


const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userName = useSelector(state => state.user)
  console.log(userName.name)


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorNotification('wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotification(''))
      }, 5000)
    }
  }


  return (
    <div>
      {userName === '' ?
        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
        : <div></div>
      }
    </div>
  )
}

export default LoginForm