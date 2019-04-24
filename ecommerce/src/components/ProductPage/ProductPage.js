import React, { Component } from "react";
import "./ProductPage.css";
import Spinner from "../UI/Spinner/Spinner";
import axios from "axios";
import FullImage from "../FullImage/FullImage";
import ProductInfo from "../ProductInfo/ProductInfo";

export default class ProductPage extends Component {
  state = {
    product: {
      attributes: {},
      images: []
    },
    imgIndex: 0,
    loadData: false,
    showFullScreenImg: false
  };
  closeFullScreenHandler = index => {
    this.setState({
      ...this.state.product,
      imgIndex: index,
      showFullScreenImg: false
    });
  };
  fetchData() {
    axios
      .get(
        `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        this.setState({
          product: res.data,
          attributes: res.data.attributes,
          images: res.data.images,
          loadData: true,
          imgIndex: 0
        });
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }
  render() {
    let product = <Spinner />;
    if (this.state.loadData) {
      product = (
        <div className="ProductPage-Height">
          <div className="ProductPage">
            <div className="image-gallery">
              <div className="image-gallery-navigation">
                <div
                  className="button-up-thumbnails"
                  onClick={() => {
                    return (document.getElementById(
                      "scroll-thumbnails"
                    ).scrollTop =
                      document.getElementById("scroll-thumbnails").scrollTop -
                      80);
                  }}
                >
                  <i className="fas fa-arrow-up" />
                </div>
                <div
                  className="image-gallery-thumbnails"
                  id="scroll-thumbnails"
                >
                  {this.state.product.images.map((img, index) => (
                    <div
                      key={index}
                      className="center-img center-img-thumbnail"
                      onClick={() => {
                        this.setState({
                          ...this.state.product,
                          imgIndex: index
                        });
                      }}
                    >
                      <img src={img.url} alt={img.url} />
                    </div>
                  ))}
                </div>
                <div
                  className="button-down-thumbnails"
                  onClick={() => {
                    return (document.getElementById(
                      "scroll-thumbnails"
                    ).scrollTop =
                      document.getElementById("scroll-thumbnails").scrollTop +
                      80);
                  }}
                >
                  <i className="fas fa-arrow-down" />
                </div>
              </div>
              <div
                className="center-img center-img-display"
                onClick={() => this.setState({ showFullScreenImg: true })}
              >
                <img
                  src={this.state.product.images[this.state.imgIndex].url}
                  alt={this.state.product.images[this.state.imgIndex].id}
                />
                <i className="fas fa-search-plus expand-img" />
              </div>
            </div>
            {this.state.showFullScreenImg ? (
              <FullImage
                closeFullscreen={index => this.closeFullScreenHandler(index)}
                imgIndex={this.state.imgIndex}
                images={this.state.product.images}
              />
            ) : null}
            <ProductInfo product={this.state.product} />
          </div>
        </div>
      );
    }
    return <React.Fragment>{product}</React.Fragment>;
  }
}
