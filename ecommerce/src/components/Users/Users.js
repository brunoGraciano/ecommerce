import React, { Component } from "react";
import "./Users.css";
import Switch from "../UI/Switch/Switch";

import { connect } from "react-redux";
import {
  updateEnable,
  updateRole,
  fetchUsers,
  toggleUser
} from "../../store/actions/indexStore";

class Users extends Component {
  componentDidMount() {
    this.props.onfetchUsers();
  }
  render() {
    return (
      <div className="User-Height">
        <div className="Users">
          {this.props.user.allUsers.length === 0 ? null : (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Enable</th>
                </tr>
              </thead>
              <tbody>
                {this.props.user.allUsers.map((user, index) => (
                  <React.Fragment key={user.id}>
                    <tr
                      style={{
                        boxShadow: user.isOpen
                          ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                          : null
                      }}
                      className="hover-row"
                    >
                      <td>{user.username}</td>
                      <td>
                        {user.name} {user.surname}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={user.roles[0].name}
                          onChange={e => {
                            this.props.onUserUpdateRole(
                              e.target.options[e.target.selectedIndex].text,
                              user,
                              index,
                              user.id,
                              this.props.user.allUsers
                            );
                          }}
                        >
                          <option value="ROLE_USER">User</option>
                          <option value="ROLE_ADMIN">Admin</option>
                        </select>
                      </td>
                      <td>
                        <Switch />
                        {user.enabled ? (
                          <div
                            className="green"
                            onClick={() =>
                              this.props.onUserUpdateEnable(
                                this.props.user.allUsers,
                                index,
                                user.id,
                                0
                              )
                            }
                          />
                        ) : (
                          <div
                            className="red"
                            onClick={() =>
                              this.props.onUserUpdateEnable(
                                this.props.user.allUsers,
                                index,
                                user.id,
                                1
                              )
                            }
                          />
                        )}
                      </td>
                      <td
                        className="dropdown-btn-wrapper"
                        onClick={() => {
                          this.props.onToggleUser(
                            this.props.user.allUsers,
                            index
                          );
                        }}
                      >
                        <i className="fas fa-caret-down dropdown-btn" />
                      </td>
                    </tr>
                    {user.isOpen ? (
                      <tr>
                        <td colSpan="6">
                          <div className="more-info">
                            <div>
                              <img
                                src={user.img}
                                alt={user.username}
                                className="profile-img"
                              />
                            </div>
                            <div className="info">
                              <div className="id">
                                <span className="bold">Id:</span> {user.id}
                              </div>
                              <div className="phone">
                                <span className="bold">Phone:</span>{" "}
                                {user.phone}
                              </div>
                              <div className="address">
                                <span className="bold">Address:</span>{" "}
                                {user.address}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchUsers: () => dispatch(fetchUsers()),
    onUserUpdateEnable: (users, index, userId, val) =>
      dispatch(updateEnable(users, index, userId, val)),
    onUserUpdateRole: (role, user, index, userId, users) =>
      dispatch(updateRole(role, user, index, userId, users)),
    onToggleUser: (users, index) => dispatch(toggleUser(users, index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
