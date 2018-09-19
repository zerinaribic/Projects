import axios from 'axios'
const photoRoute = 'photos'
const url = 'https://jsonplaceholder.typicode.com/'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: 'REQUEST_PHOTO',
    receive: 'GET_PHOTO'
  }
}
function fetchDispatch (opts) {
  return dispatch => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-zAllow-Origin': '*',
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
function fetchPhoto (id) {
  return (dispatch, getState) => {
      apiProps.url = url + photoRoute
      apiProps.params.id = id;
      return dispatch(fetchDispatch(apiProps))
  }
}
export default fetchPhoto;
