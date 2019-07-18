import React from "react";
import "./UserMenu.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const UserMenu = props => {
  return (
    <div className="UserMenu" onClick={() => props.closeFullscreen()}>
      <p className="greeting">Hello, {props.name}.</p>
      {props.role === "ROLE_ADMIN" ? (
        <React.Fragment>
          <Link to="/secure/users">Manage Users</Link>
          <Link to="/secure/categorization">Manage Categorization</Link>
          <Link to="/secure/products">Create Products</Link>
        </React.Fragment>
      ) : null}
      <Link to="/user">Settings</Link>
      <div
        className="logout"
        onClick={() => {
          document.cookie =
            "Session=; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/ ";
          props.cleanUserInfo();
          props.history.push({ pathname: "/" });
        }}
      >
        Log Out
      </div>
    </div>
  );
};
export default withRouter(UserMenu);
