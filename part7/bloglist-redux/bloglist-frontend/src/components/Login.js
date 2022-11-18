import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { setErrorNotification, clearNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

import { TextField, Button } from '@mui/material'


const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userName = useSelector(state => state.user)

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
            <div>
              <TextField label="username" value={username} onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div>
              <TextField label="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <div>
              <Button variant="contained" color="primary" type="submit">
                login
              </Button>
            </div>
          </div>
        </form>
        : <div></div>
      }
    </div>
  )
}

export default LoginForm