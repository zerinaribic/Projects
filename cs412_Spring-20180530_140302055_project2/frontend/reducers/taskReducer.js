function handleTaskActions (state, action) {
  switch (action.type) {
    case 'REQUEST_TASKS_BY_USER':
      return {
        isFetching: true,
        tasks: []
      }
    case 'RECEIVE_TASKS_BY_USER':
      const allTasksByUser = action.response.data
      return {
        isFetching: false,
        tasks: allTasksByUser
      }
    case 'REQUEST_ALL_TASKS':
      return {
        isFetching: true,
        tasks: []
      }
    case 'RECEIVE_ALL_TASKS':
      const allTasks = action.response.data
      return {
        isFetching: false,
        tasks: allTasks
      }
    case 'CLEAR_ALL_TASKS':
      return {
        isFetching: false,
        tasks: []
      }
    default:
      return state
  }
}

function taskReducer (state = {}, action) {
  return Object.assign({}, state, handleTaskActions(state, action))
}

export default taskReducer
