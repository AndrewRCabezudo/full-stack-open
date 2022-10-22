const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const updateGoodState = {
        ...state, good: state.good + 1 
      }
      return updateGoodState
    case 'OK':
      const updateOkState = {
        ...state, ok: state.ok + 1 
      }
      return updateOkState
    case 'BAD':
      const updateBadState = {
        ...state, bad: state.bad + 1 
      }
      return updateBadState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer