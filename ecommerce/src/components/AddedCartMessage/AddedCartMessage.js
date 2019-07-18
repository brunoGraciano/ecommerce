import React from "react";
import "./AddedCartMessage.css";
import { withRouter } from "react-router-dom";

const AddedCartMessage = props => {
  return (
    <div className="AddedCartMessage">
      <div className="add-cart-message">Added to shopping cart</div>
      <div className="frame-img">
        <img src={props.image} alt={props.name} />
      </div>
      <div className="details">
        <div className="brand">{props.brand}</div>
        <div className="name">{props.name}</div>
      </div>
      <button
        className="continue-shopping"
        onClick={() => props.closeCartMessage()}
      >
        Continue Shopping
      </button>
      <button
        className="checkout"
        onClick={() => props.history.push({ pathname: "/orders" })}
      >
        Checkout
      </button>
    </div>
  );
};
export default withRouter(AddedCartMessage);
