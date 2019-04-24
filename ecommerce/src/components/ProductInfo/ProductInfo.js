import React, { Component } from "react";
import "./ProductInfo.css";
import AddedCartMessage from "../AddedCartMessage/AddedCartMessage";
import { connect } from "react-redux";
import { addProductOrder } from "../../store/actions/indexStore";
import CSSTransition from "react-transition-group/CSSTransition";
import { Link } from "react-router-dom";

class ProductInfo extends Component {
  state = {
    isOpenCartMessage: false,
    quantity: 0,
    isAdmin: false
  };
  closeCartMessage() {
    this.setState({ isOpenCartMessage: false });
  }
  render() {
    const animationTiming = {
      enter: 400,
      exit: 400
    };
    return (
      <React.Fragment>
        <div className="ProductInfo">
          <header>
            <h1 className="brand">{this.props.product.attributes.brand}</h1>
            <h1 className="model">{this.props.product.name}</h1>
          </header>
          <section>
            <div className="color">
              <h3>Color</h3>
              <div
                style={{ backgroundColor: this.props.product.attributes.color }}
              />
            </div>
            <div className="size">
              <h3>Size</h3>
              <h4 className="size-text">
                {this.props.product.attributes.size}
              </h4>
            </div>
            <div className="quantity">
              <h3>Quantity</h3>
              <h4>{this.props.product.quantity} units</h4>
            </div>
            <div className="price">
              <h3>Price</h3>
              <h4>{this.props.product.price} €</h4>
            </div>
            <div className="description">
              <h3>Description</h3>
              <i
                className="fas fa-plus btn-plus"
                id="btn-plus"
                onClick={() => {
                  if (
                    document.getElementById("description").style.display ===
                    "block"
                  ) {
                    document.getElementById("btn-plus").style.transform =
                      "rotate(90deg)";
                    document.getElementById("description").style.display =
                      "none";
                  } else {
                    document.getElementById("btn-plus").style.transform =
                      "rotate(45deg)";
                    document.getElementById("description").style.display =
                      "block";
                  }
                }}
              />
              <p id="description">{this.props.product.description}</p>
            </div>
            {this.props.user.authenticatedUser.roles === undefined ? null : this
                .props.user.authenticatedUser.roles[0].name === "ROLE_ADMIN" ? (
              <Link
                to={"/edit-product/" + this.props.product.id}
                className="btn-edit"
              >
                Edit Product
              </Link>
            ) : null}
            <button
              className="btn-basket"
              style={
                this.props.user.authenticatedUser.roles === undefined
                  ? null
                  : this.props.user.authenticatedUser.roles[0].name ===
                    "ROLE_ADMIN"
                  ? { gridColumn: "2 / span 1", marginLeft: "5px" }
                  : null
              }
              onClick={() => {
                this.setState({ isOpenCartMessage: true });
                this.props.onaddProductOrder(this.props.product.id);
              }}
            >
              Add to basket
            </button>
          </section>
        </div>

        <CSSTransition
          in={this.state.isOpenCartMessage}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter: "order-message-enter",
            enterActive: "order-message-open",
            exit: "order-message-exit",
            exitActive: "order-message-closed"
          }}
        >
          {state => (
            <AddedCartMessage
              closeCartMessage={() => this.closeCartMessage()}
              brand={this.props.product.attributes.brand}
              name={this.props.product.name}
              image={this.props.product.thumbnail}
            />
          )}
        </CSSTransition>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onaddProductOrder: productId => dispatch(addProductOrder(productId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);
