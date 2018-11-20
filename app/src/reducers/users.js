import {
  USERS_FETCH_ERROR,
  USERS_IS_FETCHING,
  RECEIVE_USERS
} from "../actions/users"

export default function users (
  state = {
    isFetching: false,
    fetchError: false,
    users: []
  },
  action
) {
  switch (action.type) {
    case USERS_FETCH_ERROR:
    return {
      ...state,
      fetchError: true,
    }
    case USERS_IS_FETCHING:
    return {
      ...state,
      isFetching: true,
    }
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        fetchError: false,
        users: action.payload
      }
    default:
      return state
  }
}