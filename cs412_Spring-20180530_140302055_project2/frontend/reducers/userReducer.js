function handleUserActions (state, action) {
  switch (action.type) {
    case 'REQUEST_ALL_USERS':
      return {
        isFetching: true,
        users: []
      }
    case 'RECEIVE_ALL_USERS':
      const userDataAll = action.response.data
      return {
        isFetching: false,
        users: userDataAll
      }
    default:
      return state
  }
}

function userReducer (state = {}, action) {
  return Object.assign({}, state, handleUserActions(state, action))
}

export default userReducer
