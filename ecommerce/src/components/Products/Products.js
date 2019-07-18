import React, { Component } from "react";
import "./Products.css";
import Product from "./Product/Product";
import axios from "axios";
import Filter from "../Filter/Filter";

export default class Products extends Component {
  state = {
    products: [],
    params: {
      brand: "All",
      color: "All",
      weight: "All",
      size: "All"
    }
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.categories !==
        prevProps.match.params.categories ||
      this.props.match.params.subcategories !==
        prevProps.match.params.subcategories
    ) {
      this.fetchData();
    }
    if (this.state.params !== prevState.params) {
      this.fetchData();
    }
  }
  fetchData() {
    let url = `http://localhost:8086/catalogs/categories/${
      this.props.match.params.categories
    }/subcategories/${this.props.match.params.subcategories}/products`;
    let params = [];
    if (this.state.params.brand !== "All") {
      params.push("brand=" + this.state.params.brand);
    }
    if (this.state.params.color !== "All") {
      params.push("color=" + this.state.params.color);
    }
    if (this.state.params.weight !== "All") {
      params.push("weight=" + this.state.params.weight);
    }
    if (this.state.params.size !== "All") {
      params.push("size=" + this.state.params.size);
    }
    if (params.join("&") !== "") {
      url = url + "?" + params.join("&");
    }
    axios.get(url).then(res => {
      this.setState({
        products: res.data
      });
    });
  }
  render() {
    let product = <h2>No Products!</h2>;
    if (this.state.products.length !== 0) {
      product = this.state.products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          img={product.thumbnail}
          price={product.price}
          brand={product.attributes.brand}
          categories={this.props.match.params.categories}
          subcategories={this.props.match.params.subcategories}
        />
      ));
    }

    return (
      <React.Fragment>
        <Filter
          brandParams={brand =>
            this.setState({
              params: {
                ...this.state.params,
                brand: brand
              }
            })
          }
          colorParams={color =>
            this.setState({
              params: {
                ...this.state.params,
                color: color
              }
            })
          }
          weightParams={weight =>
            this.setState({
              params: {
                ...this.state.params,
                weight: weight
              }
            })
          }
          sizeParams={size =>
            this.setState({
              params: {
                ...this.state.params,
                size: size
              }
            })
          }
        />
        <div className="Products-Height">
          <div className="Products">{product}</div>
        </div>
      </React.Fragment>
    );
  }
}
