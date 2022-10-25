import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = notification ? {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  } : {   border: 'none',
  padding: 0,
  borderWidth: 0}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification