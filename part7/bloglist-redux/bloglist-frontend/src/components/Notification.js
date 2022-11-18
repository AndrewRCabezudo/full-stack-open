import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // console.log(notification)

  if (notification.type === 'error') {
    return (
      <Alert severity="error">
        {notification.message}
      </Alert>
    )
  } else if (notification.type === 'success') {
    return (
      <Alert severity="success">
        {notification.message}
      </Alert>
    )
  } else if (notification.type === 'clear') {
    return null
  } else {
    return null
  }
}

export default Notification