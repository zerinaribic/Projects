// import { fetchDispatch } from './fetchUtils'
import axios from 'axios'
const routeByUserId = 'user/tasks'
const routeAllTasks = 'tasks'
const url = 'http://localhost:3000/'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: '',
    receive: ''
  }
}

function shouldFetchData ({ task }) {
  return !task.tasks || !task.isFetching
}

function fetchDispatch (opts) {
  return dispatch => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      }
    }
    dispatch({ type: opts.types.request }, config)
    return axios
      .get(opts.url, {
        params: opts.params
      })
      .then(response => {
        // Dispatch the recevied action with type and data
        const obj = opts.onReceived ? opts.onReceived(response) : { response }
        return dispatch(Object.assign({ type: opts.types.receive }, obj))
      })
      .catch(error => dispatch({ type: 'RESET_ERROR_MESSAGE' }))
  }
}

function fetchTasksByUserId (id) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + routeByUserId
      apiProps.types.request = 'REQUEST_TASKS_BY_USER'
      apiProps.types.receive = 'RECEIVE_TASKS_BY_USER'
      apiProps.params = { userId: id}
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function fetchAllTasks () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + routeAllTasks
      apiProps.types.request = 'REQUEST_ALL_TASKS'
      apiProps.types.receive = 'RECEIVE_ALL_TASKS'
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function clearTasks () {
  return (dispatch, getState) => {
    return dispatch({type: 'CLEAR_ALL_TASKS'})
  }
}

export default { fetchTasksByUserId, fetchAllTasks, clearTasks }
