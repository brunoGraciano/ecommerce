import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { fetchAuthenticatedUserLogin } from "../../../store/actions/indexStore";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Login extends Component {
  state = {
    user: {
      username: "",
      password: ""
    },
    flash: true
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.submitLoginHandler();
    }
  };

  submitLoginHandler() {
    this.props.onfetchAuthenticatedUserLogin(
      this.state.user.username,
      this.state.user.password
    );
    this.setState({ flash: true });
  }

  render() {
    return (
      <React.Fragment>
        <div className="Login">
          <form onSubmit={e => e.preventDefault()}>
            <h1>Login</h1>
            <div className="wrapper-login-fields">
              <input
                className="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={e => {
                  this.setState({
                    user: { ...this.state.user, username: e.target.value }
                  });
                }}
                onKeyPress={e => this.handleKeyPress(e)}
              />
              <input
                className="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.setState({
                    user: { ...this.state.user, password: e.target.value }
                  });
                }}
                onKeyPress={e => this.handleKeyPress(e)}
              />
              <p
                style={{
                  visibility:
                    this.props.user.authenticatedUser.id !== "" &&
                    this.props.user.error !== ""
                      ? "visible"
                      : "hidden"
                }}
                onAnimationEnd={() => this.setState({ flash: false })}
                className={this.state.flash ? "warning flash" : "warning"}
              >
                {this.props.user.error}
              </p>
              <button
                onClick={() => {
                  this.submitLoginHandler();
                }}
              >
                Login
              </button>
              <p className="register">
                Not registered?{" "}
                <span
                  onClick={() => {
                    this.props.toggleRegister();
                  }}
                >
                  Create an account
                </span>
              </p>
            </div>
          </form>
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchAuthenticatedUserLogin: (username, password) =>
      dispatch(fetchAuthenticatedUserLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
