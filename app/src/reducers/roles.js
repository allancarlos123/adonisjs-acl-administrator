import {
  RECEIVE_ROLES
} from "../actions/users"

export default function users (
  state = {
    roles: []
  },
  action
) {
  switch (action.type) {
    case RECEIVE_ROLES:
      return {
        ...state,
        roles: action.payload
      }
    default:
      return state
  }
}