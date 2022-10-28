import { createSlice } from '@reduxjs/toolkit'

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
    dispatch(updateNotification(content))
    setTimeout(() => {
      dispatch(updateNotification(null))
    }, delay * 1000)
  }
}

export default notificationSlice.reducer