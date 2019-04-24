import React, { Component } from "react";
import "./Items.css";
import Icons from "../../UI/Icons/Icons";
import Entry from "../../Entry/Entry";
import Backdrop from "../../UI/Backdrop/Backdrop";
import UserMenu from "../../UserMenu/UserMenu";
import { getCookie } from "../../Util/Util";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchAuthenticatedUser,
  fetchProductOrder,
  resetError,
  cleanUserInfo
} from "../../../store/actions/indexStore";
import CSSTransition from "react-transition-group/CSSTransition";

class Items extends Component {
  state = {
    showEntry: false,
    showUserMenu: false
  };
  closeFullScreenHandler = (index = null) => {
    this.setState({
      showEntry: false,
      showUserMenu: false
    });
  };
  componentDidMount() {
    this.props.onfetchProductOrder();
    if (getCookie("Session") !== "") {
      this.props.onfetchAuthenticatedUser();
    }
  }
  render() {
    const animationTiming = {
      enter: 400,
      exit: 400
    };
    return (
      <div className="Items">
        <div
          onClick={() => this.props.history.push({ pathname: "/orders" })}
          className="bag-wrapper"
        >
          <Icons type="bag" classNames="icon" />
          <div
            className="quantity-number"
            style={{
              display: this.props.order.total === 0 ? "none" : "block"
            }}
          >
            {this.props.order.total}
          </div>
        </div>
        <div
          onClick={() => {
            if (getCookie("Session") === "") {
              this.setState((prevState, props) => {
                return { showEntry: !prevState.showEntry };
              });
            } else {
              this.setState((prevState, props) => {
                return { showUserMenu: !prevState.showUserMenu };
              });
            }
          }}
        >
          {getCookie("Session") !== "" ? (
            <img
              alt={this.props.user.authenticatedUser.username}
              src={this.props.user.authenticatedUser.img}
              className="small-img"
            />
          ) : (
            <Icons type="user" classNames="icon" />
          )}
        </div>
        <CSSTransition
          in={this.state.showEntry && getCookie("Session") === ""}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter: "entry-message-enter",
            enterActive: "entry-message-open",
            exitActive: "entry-message-closed"
          }}
        >
          {state => (
            <Entry
              closeEntry={() => {
                this.closeFullScreenHandler();
                this.props.onresetError();
              }}
            />
          )}
        </CSSTransition>
        {this.state.showUserMenu && getCookie("Session") !== "" ? (
          <React.Fragment>
            <UserMenu
              closeFullscreen={() => this.closeFullScreenHandler()}
              cleanUserInfo={() => this.props.oncleanUserInfo()}
              role={this.props.user.authenticatedUser.roles[0].name}
              name={
                this.props.user.authenticatedUser.name +
                " " +
                this.props.user.authenticatedUser.surname
              }
            />
            <Backdrop
              isTransparent={true}
              closeFullscreen={() => this.closeFullScreenHandler()}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchProductOrder: () => dispatch(fetchProductOrder()),
    oncleanUserInfo: () => dispatch(cleanUserInfo()),
    onfetchAuthenticatedUser: () => dispatch(fetchAuthenticatedUser()),
    onresetError: () => dispatch(resetError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Items));
