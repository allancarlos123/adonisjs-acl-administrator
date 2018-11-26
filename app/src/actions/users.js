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

// Roles
const fetchRoles = async () => {
  try {
    const res = await api.get("/roles");
    return res
  } catch (err) {
    return err
  }
}

export const RECEIVE_ROLES = "RECEIVE_ROLES"
export function receiveRoles(roles) {
  return {
    type: RECEIVE_ROLES,
    payload: roles
  }
}

export function rolesFetch() {
  return dispatch => {
    return fetchRoles().then(
      res => dispatch(receiveRoles(res.data)),
      err => console.log(err)
    )
  }
}

// Single User
const fetchUser = async userId => {
  try {
    const res = await api.get(`/users/${userId}`);
    return res
  } catch (err) {
    return err
  }
}

export const RECEIVE_USER = "RECEIVE_USER"
export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    payload: user
  }
}

export const USER_IS_FETCHING = "USER_IS_FETCHING"
export function userIsFetching() {
  return {
    type: USER_IS_FETCHING,
    payload: true
  }
}

export const USER_FETCH_ERROR = "USER_FETCH_ERROR"
export function userFetchError(err) {
  return {
    type: USER_FETCH_ERROR,
    payload: err,
    error: true
  }
}

export function userFetch(userId) {
  return dispatch => {
    dispatch(userIsFetching())
    return fetchUser(userId).then(
      res => dispatch(receiveUser(res.data)),
      err => dispatch(userFetchError(err))
    )
  }
}

// Edit user
const userEdit = async (userId, values) => {
  values.profile_pic = values.profile_pic[0].name
  try {
    const res = await api.put(`/users/${userId}`, values);
    return res;
  } catch (err) {
    return err;
  }
};

export function editUser(userId, values) {
  return dispatch => {
    // dispatch(userIsFetching())
    return userEdit(userId).then(
      res => console.log(res),
      err => console.log(err)
    )
  }
}