import { createSlice } from '@reduxjs/toolkit'

let timeoutID
const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
       return action.payload
    }
  },
})
export const { updateNotification } = notificationSlice.actions

export const setNotification = (content, delay) => {
  return async dispatch => {
    console.log(timeoutID)
    dispatch(updateNotification(content))
    timeoutID = setTimeout(() => {
      dispatch(updateNotification(null))
    }, delay * 1000)
  }
}

export default notificationSlice.reducer