import { getCookie } from "../../components/Util/Util";
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addUser = user => {
  axios({
    method: "post",
    headers: { "content-type": "application/json" },
    data: JSON.stringify(user),
    url: "http://localhost:8090/login/users"
  })
    .then(res => {
      if (res.status === 201) {
        this.props.closeEntry();
      }
    })
    .catch(error => {
      this.setState({ error: error.response.data.message });
    });

  return {
    type: actionTypes.ADD_USER,
    user: user
  };
};

export const removeUser = username => {
  return {
    type: actionTypes.REMOVE_USER,
    username: username
  };
};

export const updateEnable = (users, index, userId, val) => {
  let allUsers = [...users];
  let user = { ...users[index] };
  user.enabled = val;
  user.accountNonExpired = val;
  user.accountNonLocked = val;
  user.credentialsNonExpired = val;
  allUsers[index] = user;
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/login/secure/users/${userId}?access_token=${getCookie(
          "Session"
        )}`,
        user
      )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_ENABLE,
            allUsers: allUsers
          });
        }
      });
  };
};

export const updateRole = (role, user, index, userId, users) => {
  return dispatch => {
    let id;
    if (role === "Admin") {
      id = 2;
    } else if (role === "User") {
      id = 1;
    }
    let r = "ROLE_" + role.toUpperCase();
    user.roles[0].id = id;
    user.roles[0].name = r;
    axios
      .put(
        `http://localhost:8090/login/secure/users/${userId}?access_token=${getCookie(
          "Session"
        )}`,
        user
      )
      .then(res => {
        if (res.status === 200) {
          let userArr = [...users];
          userArr[index] = user;
          dispatch({
            type: actionTypes.UPDATE_ROLE,
            allUsers: userArr
          });
        }
      });
  };
};

export const fetchUsers = () => {
  return dispatch => {
    let url = `http://localhost:8090/login/secure/users?access_token=${getCookie(
      "Session"
    )}`;
    axios
      .get(url)
      .then(res => {
        let users = [];
        let array = res.data;
        for (let i = 0; i < array.length; i++) {
          users.push({ ...array[i], isOpen: false });
        }
        dispatch(setUsers(users));
      })
      .catch(err => {
        dispatch(fetchUsersFailed());
      });
  };
};

export const setUsers = users => {
  return {
    type: actionTypes.FETCH_USERS,
    users: users
  };
};

export const fetchUsersFailed = () => {
  return {
    type: actionTypes.FETCH_USERS_FAILED
  };
};

export const toggleUser = (users, index) => {
  let allUsers = [...users];
  allUsers[index].isOpen = !allUsers[index].isOpen;
  return {
    type: actionTypes.TOGGLE_USER,
    allUsers: allUsers
  };
};

export const fetchAuthenticatedUser = () => {
  return dispatch => {
    let url = `http://localhost:8090/login/private/users?access_token=${getCookie(
      "Session"
    )}`;
    axios
      .get(url)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_AUTHENTICATED_USER,
          user: res.data
        });
      })
      .catch(err => {});
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_USER_ERROR
  };
};

export const fetchAuthenticatedUserLogin = (username, password) => {
  return dispatch => {
    axios
      .request({
        url: `/oauth/token?grant_type=password&username=${username}&password=${password}`,
        method: "post",
        baseURL: "http://localhost:8090/login/",
        auth: {
          username: "ecommerce-micros",
          password: "ecommerce"
        }
      })
      .then(res => {
        if (res.status === 200) {
          document.cookie = `Session=${res.data.access_token}; path=/`;
          dispatch(fetchAuthenticatedUser());
        }
      })
      .catch(error => {
        let message = "";
        if (error.response.data.error_description === "Bad credentials") {
          message =
            "The username or password you entered isn`t correct. Try entering it again.";
        } else {
          message = error.response.data.error_description;
        }
        dispatch({
          type: actionTypes.FETCH_AUTHENTICATED_USER,
          error: message
        });
      });
  };
};

export const cleanUserInfo = () => {
  return {
    type: actionTypes.CLEAN_USER_INFO
  };
};
