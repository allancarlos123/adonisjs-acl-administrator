import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import users from "./users";
import user from "./user";
import roles from "./roles";

export default combineReducers({
  form: formReducer,
  users,
  user,
  roles
});
