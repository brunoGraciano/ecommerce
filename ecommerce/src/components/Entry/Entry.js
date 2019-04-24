import React, { Component } from "react";
import "./Entry.css";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default class Entry extends Component {
  state = {
    showRegister: false
  };
  toggleRegisterHandler = () => {
    this.setState((prevState, props) => {
      return { showRegister: !prevState.showRegister };
    });
  };
  render() {
    return (
      <div className="Entry">
        {this.state.showRegister ? (
          <Register
            toggleRegister={() => this.toggleRegisterHandler()}
            {...this.props}
          />
        ) : (
          <Login
            toggleRegister={() => this.toggleRegisterHandler()}
            {...this.props}
          />
        )}
      </div>
    );
  }
}
