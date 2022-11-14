
const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_ERROR':
      return action.data
    case 'SET_SUCCESS':
      return action.data
    case 'SET_CLEAR':
      return action.data
    default:
      return state
  }
}

export const setErrorNotification = (message) => {
  return {
    type: 'SET_ERROR',
    data: {
      type: 'error',
      message: message
    }
  }
}

export const setSuccessNotification = (message) => {
  return {
    type: 'SET_SUCCESS',
    data: {
      type: 'success',
      message: message
    }
  }
}

export const clearNotification = (message) => {
  return {
    type: 'SET_CLEAR',
    data: {
      type: 'clear',
      message: message
    }
  }
}

export default notificationReducer