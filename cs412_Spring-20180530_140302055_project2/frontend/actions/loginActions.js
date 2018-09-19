// import { fetchDispatch } from './fetchUtils'
import axios from 'axios'
const loginRoute = 'user/login'
const url = 'http://localhost:3000/'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: 'REQUEST_LOGIN_DETAILS',
    receive: 'RECEIVE_LOGIN_DETAILS'
  }
}

function shouldFetchData ({ loginProps }) {
  return !loginProps.logged || !loginProps.isFetching
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

function checkLoginDetails (email, password) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + loginRoute
      apiProps.params = { email: email, password: password}
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function signOut () {
  return (dispatch, getState) => {
    return dispatch({ type: 'USER_SIGN_OUT' })
    }
}



export default { checkLoginDetails, signOut }
