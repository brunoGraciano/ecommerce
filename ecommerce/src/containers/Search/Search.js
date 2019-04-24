import React, { Component } from "react";
import "./Search.css";
import Icons from "../../components/UI/Icons/Icons";
import axios from "axios";
import ProductsSearch from "../../components/ProductsSearch/ProductsSearch";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

export default class extends Component {
  state = {
    products: [],
    value: "",
    isFocus: false
  };
  fetchData() {
    axios.get(`http://localhost:8086/products`).then(res => {
      let productsSearch = [];
      if (this.state.value !== "") {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].name.slice(0, this.state.value.length).toLowerCase() ===
            this.state.value.toLowerCase()
          ) {
            productsSearch.push(res.data[i]);
            if (productsSearch.length === 5) {
              break;
            }
          }
        }
      }
      this.setState({ products: productsSearch });
    });
  }
  cleanInputHandler = () => {
    this.setState({ products: [], value: "" });
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="Search"
          style={this.state.value === "" ? { zIndex: "2" } : { zIndex: "4" }}
        >
          <div className="search-icon">
            <Icons type="search" classNames="icon" />
          </div>
          <input
            type="text"
            placeholder="Search for anything"
            value={this.state.value}
            onChange={e => {
              this.setState({ value: e.target.value });
              this.fetchData();
            }}
            onFocus={() => this.setState({ isFocus: true })}
            onBlur={() => this.setState({ isFocus: false })}
          />
          {this.state.value === "" ? null : (
            <ProductsSearch
              products={this.state.products}
              cleanInput={() => this.cleanInputHandler()}
            />
          )}
        </div>
        {this.state.value === "" ? null : (
          <Backdrop closeFullscreen={() => this.cleanInputHandler()} />
        )}
      </React.Fragment>
    );
  }
}
