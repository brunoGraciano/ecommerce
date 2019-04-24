import React, { Component } from "react";
import "./Register.css";
import axios from "axios";
import Backdrop from "../../UI/Backdrop/Backdrop";

export default class Register extends Component {
  state = {
    user: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      username: "",
      password: "",
      enabled: true,
      accountNonExpired: true,
      credentialsNonExpired: true,
      accountNonLocked: true
    },
    error: "",
    flash: true
  };

  postUserHandler() {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(this.state.user),
      url: "http://localhost:8087/users"
    })
      .then(res => {
        if (res.status === 201) {
          this.props.closeEntry();
        }
      })
      .catch(error => {
        this.setState({ error: error.response.data.message });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="Register">
          <header>
            <i
              className="fas fa-arrow-left"
              onClick={() => {
                this.props.toggleRegister();
              }}
            />
            <h1>Register</h1>
          </header>
          <div className="wrapper-register-fields">
            <input
              className="name"
              type="text"
              placeholder="Name"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, name: e.target.value }
                });
              }}
            />
            <input
              className="surname"
              type="text"
              placeholder="Surname"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, surname: e.target.value }
                });
              }}
            />
            <input
              className="email"
              type="email"
              placeholder="Email"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, email: e.target.value }
                });
              }}
            />
            <input
              className="phone"
              type="text"
              placeholder="Phone"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, phone: e.target.value }
                });
              }}
            />
            <input
              className="address"
              type="text"
              placeholder="Address"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, address: e.target.value }
                });
              }}
            />
            <input
              className="username"
              type="text"
              placeholder="Username"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, username: e.target.value }
                });
              }}
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={e => {
                this.setState({
                  user: { ...this.state.user, password: e.target.value }
                });
              }}
            />
            <p
              style={{
                visibility: this.state.error !== "" ? "visible" : "hidden"
              }}
              onAnimationEnd={() => this.setState({ flash: false })}
              className={this.state.flash ? "warning flash" : "warning"}
            >
              {this.state.error}
            </p>
            <button
              onClick={() => {
                this.postUserHandler();
                this.setState({ flash: true });
              }}
            >
              Register
            </button>
          </div>
        </div>
        <Backdrop
          closeFullscreen={() => {
            this.props.closeEntry();
          }}
        />
      </React.Fragment>
    );
  }
}
