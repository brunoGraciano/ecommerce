import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allUsers: [],
  authenticatedUser: {},
  error: ""
};

const addUser = (state, action) => {
  return [];
};
const removeUser = (state, action) => {
  return [];
};
const fetchUsers = (state, action) => {
  return { ...state, allUsers: [...action.users] };
};

const updateEnable = (state, action) => {
  return { ...state, allUsers: action.allUsers };
};
const updateRole = (state, action) => {
  return { ...state, allUsers: action.allUsers };
};
const toggleUser = (state, action) => {
  return { ...state, allUsers: action.allUsers };
};
const authenticatedUser = (state, action) => {
  if (action.error === undefined) {
    return { ...state, authenticatedUser: action.user, error: "" };
  } else {
    return { ...state, error: action.error };
  }
};
const resetError = (state, action) => {
  return { ...state, error: "" };
};
const cleanUserInfo = (state, action) => {
  return { ...state, authenticatedUser: {} };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return addUser(state, action);
    case actionTypes.REMOVE_USER:
      return removeUser(state, action);
    case actionTypes.FETCH_USERS:
      return fetchUsers(state, action);
    case actionTypes.UPDATE_ENABLE:
      return updateEnable(state, action);
    case actionTypes.UPDATE_ROLE:
      return updateRole(state, action);
    case actionTypes.TOGGLE_USER:
      return toggleUser(state, action);
    case actionTypes.FETCH_AUTHENTICATED_USER:
      return authenticatedUser(state, action);
    case actionTypes.RESET_USER_ERROR:
      return resetError(state, action);
    case actionTypes.CLEAN_USER_INFO:
      return cleanUserInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
