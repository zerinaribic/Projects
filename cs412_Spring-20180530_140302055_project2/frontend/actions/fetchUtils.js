import axios from 'axios'
// function handleResponse (response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response.json()
//   }
//   throw new Error(formatErrorMessage(response))
// }

// function formatErrorMessage (res) {
//   return `[${res.status}]: ${res.statusText} (${res.url})`
// }

// Error action that is dispatched on failed fetch requests
function errorAction (error) {
  return {
    type: 'SET_ERROR_MESSAGE',
    error: true,
    errorMessage: error.message
  }
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
      .catch(error => dispatch(errorAction(error)))
  }
}

function postDispatch (opts) {
  return dispatch => {
    dispatch({ type: opts.types.request })
    const config = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    }
    return (
      axios
        .post(opts.url, opts.params, config)
        // .then(handleResponse)
        .then(data => {
          // Dispatch the recevied action with type and data
          const obj = opts.onReceived ? opts.onReceived(data) : { data }
          return dispatch(Object.assign({ type: opts.types.receive }, obj))
        })
        .catch(error => {
          return dispatch(errorAction(error))
        })
    )
  }
}

function deleteDispatch (opts) {
  return dispatch => {
    dispatch({ type: opts.types.request })
    const config = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    }
    return (
      axios
        .delete(opts.url, opts.params, config)
        // .then(handleResponse)
        .then(data => {
          // Dispatch the recevied action with type and data
          const obj = opts.onReceived ? opts.onReceived(data) : { data }
          return dispatch(Object.assign({ type: opts.types.receive }, obj))
        })
        .catch(error => {
          return dispatch(errorAction(error))
        })
    )
  }
}

export default { fetchDispatch, postDispatch, deleteDispatch }