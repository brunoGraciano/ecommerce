import React, { Component } from "react";
import "./EditUser.css";
import { getCookie } from "../Util/Util";
import axios from "axios";
import { Link } from "react-router-dom";
import Icons from "../UI/Icons/Icons";
import Modal from "../UI/Modal/Modal";

export default class EditUser extends Component {
  state = {
    user: {
      email: "",
      name: "",
      surname: "",
      phone: "",
      address: "",
      username: "",
      password: "",
      img: ""
    },
    password: "",
    isModalOpen: false
  };
  componentDidMount() {
    let url = `http://localhost:8087/private/users?access_token=${getCookie(
      "Session"
    )}`;
    axios.get(url).then(res => {
      this.setState({ user: res.data });
    });
  }

  updateUser() {
    let user = this.state.user;
    if (this.state.password.trim() !== "") {
      user.password = this.state.password;
    }
    axios.put(
      `http://localhost:8087/private/users?access_token=${getCookie(
        "Session"
      )}`,
      user
    );
    this.props.history.push({ pathname: "/" });
  }
  closeFullScreenHandler = value => {
    if (value.trim() !== "") {
      this.setState({ user: { ...this.state.user, img: value } });
    }
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="EditUser">
          <div className="form-wrapper">
            <div className="profile-img-wrapper">
              <img
                onClick={() =>
                  this.setState((prevState, props) => {
                    return { isModalOpen: !prevState.isModalOpen };
                  })
                }
                src={this.state.user.img}
                alt={this.state.user.username}
                className="profile-img"
              />
              <Icons type="plus" classNames="icon" />
            </div>
            <div className="form-fields">
              <div id="name">
                <p>Name:</p>
                <input
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, name: e.target.value }
                    });
                  }}
                  value={this.state.user.name}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div id="surname">
                <p>Surname:</p>
                <input
                  id="surname"
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, surname: e.target.value }
                    });
                  }}
                  value={this.state.user.surname}
                  type="text"
                  placeholder="Surname"
                />
              </div>
              <div id="phone">
                <p>Phone:</p>
                <input
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, phone: e.target.value }
                    });
                  }}
                  value={this.state.user.phone}
                  type="text"
                  placeholder="Phone"
                />
              </div>

              <div id="address">
                <p>Address:</p>
                <input
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, address: e.target.value }
                    });
                  }}
                  value={this.state.user.address}
                  type="text"
                  placeholder="Address"
                />
              </div>
              <div id="email">
                <p>Email:</p>
                <input
                  value={this.state.user.email}
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, email: e.target.value }
                    });
                  }}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div id="username">
                <p>Username:</p>
                <input
                  value={this.state.user.username}
                  onChange={e => {
                    this.setState({
                      user: { ...this.state.user, username: e.target.value }
                    });
                  }}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div id="password">
                <p>Password:</p>
                <input
                  onChange={e => {
                    this.setState({
                      password: e.target.value
                    });
                  }}
                  type="text"
                  placeholder="Password"
                />
                <p className="input-info">
                  Leave blank if you don`t want to change it.
                </p>
              </div>
              <button id="save" onClick={() => this.updateUser()}>
                Save
              </button>
              <Link id="cancel" to={"/"}>
                Cancel
              </Link>
            </div>
          </div>
        </div>
        {this.state.isModalOpen ? (
          <Modal
            closeFullscreen={value => this.closeFullScreenHandler(value)}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
