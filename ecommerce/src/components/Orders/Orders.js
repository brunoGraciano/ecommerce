import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import {
  fetchProductOrder,
  updateProductOrderQuantity
} from "../../store/actions/indexStore";

class Orders extends Component {
  componentDidMount() {
    this.props.onfetchProductOrder();
  }
  navigateProduct(product) {
    this.props.history.push({
      pathname: `/categories/subcategories/${product.id}`
    });
  }
  calculateTotalHandler() {
    let products = this.props.order.products;
    let total = 0;
    for (let p = 0; p < products.length; p++) {
      total += products[p].price * products[p].quantityCart;
    }
    total = Math.round(total * 100) / 100;
    return total;
  }

  render() {
    return (
      <div className="Orders-Height">
        <div className="Orders">
          <div className="cart-products">
            <div className="cart-products-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.order.products.length !== 0 ? (
                    this.props.order.products.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <div
                            className="frame-img"
                            onClick={() => this.navigateProduct(product)}
                          >
                            <img src={product.thumbnail} alt={product.id} />
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() => this.navigateProduct(product)}
                            className="details"
                          >
                            <div className="product-brand">
                              {product.attributes.brand}
                            </div>
                            <div className="product-name">{product.name}</div>
                          </div>
                        </td>
                        <td>{"€" + product.price}</td>
                        <td>
                          <input
                            className="quantity-input"
                            type="number"
                            name="quantityLs"
                            min="0"
                            value={product.quantityCart}
                            max={product.quantity}
                            onChange={e => {
                              this.props.onupdateProductOrderQuantity(
                                e.target.value,
                                product.id,
                                this.props.order.products
                              );
                            }}
                            onKeyPress={event => event.preventDefault()}
                          />
                        </td>
                        <td>
                          {"€" +
                            Math.round(
                              product.price * product.quantityCart * 100
                            ) /
                              100}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-products">
                        Your cart is empty!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="price">
            <div className="price-wrapper">
              <div className="total-price">
                <p>Total to pay</p>
                <p className="price-number">€{this.calculateTotalHandler()}</p>
              </div>
              <button className="checkout-btn">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchProductOrder: () => dispatch(fetchProductOrder()),
    onupdateProductOrderQuantity: (inputValue, productId, products) =>
      dispatch(updateProductOrderQuantity(inputValue, productId, products))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
