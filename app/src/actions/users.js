import api from "../services/api"

const fetchUsers = async activePage => {
  try {
    const res = await api.get("/users", {
      params: {
        page: activePage
      }
    });
    return res
  } catch (err) {
    return err
  }
}

export const RECEIVE_USERS = "RECEIVE_USERS"
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: users
  }
}

export const USERS_IS_FETCHING = "USERS_IS_FETCHING"
export function usersIsFetching() {
  return {
    type: USERS_IS_FETCHING,
    payload: true
  }
}

export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR"
export function usersFetchError(err) {
  return {
    type: USERS_FETCH_ERROR,
    payload: err,
    error: true
  }
}

export function usersFetch(activePage) {
  return dispatch => {
    dispatch(usersIsFetching())
    return fetchUsers(activePage).then(
      res => dispatch(receiveUsers(res.data)),
      err => dispatch(usersFetchError(err))
    )
  }
}