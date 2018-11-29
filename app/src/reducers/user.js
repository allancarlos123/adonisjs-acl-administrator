import _ from "lodash"
import {
  USER_FETCH_ERROR,
  USER_IS_FETCHING,
  RECEIVE_USER,
  DELETE_USER
} from "../actions/users";

export default function user(
  state = {
    isFetching: false,
    fetchError: false,
    user: []
  },
  action
) {
  switch (action.type) {
    case USER_FETCH_ERROR:
      return {
        ...state,
        fetchError: true,
      }
    case USER_IS_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        fetchError: false,
        user: action.payload
      }
    case DELETE_USER:
      return _.omit(...state, action.payload)
    default:
      return state
  }
}