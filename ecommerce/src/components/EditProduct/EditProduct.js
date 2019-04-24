import React, { Component } from "react";
import "./EditProduct.css";
import { connect } from "react-redux";
import {
  removeProduct,
  fetchSizes,
  fetchWeights,
  fetchBrands,
  fetchColors
} from "../../store/actions/indexStore";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import axios from "axios";
import { getCookie } from "../../components/Util/Util";

class EditProduct extends Component {
  state = {
    product: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      thumbnail: ""
    },
    attributes: {
      brand: "",
      color: "",
      weight: "",
      size: ""
    },
    imageUrl: "",
    imageArr: [],
    imageArrOriginal: [],
    errorAddImage: "",
    errorAddImageFlash: false,
    error: ""
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchProductHandler(this.props.match.params.product);
    this.props.onfetchSizes();
    this.props.onfetchColors();
    this.props.onfetchWeights();
    this.props.onfetchBrands();
  }
  updateProductHandler(
    productId,
    product,
    attributes,
    imageArr,
    imageArrOriginal
  ) {
    const imagesArrAdd = [];
    const imagesArrNotDeleted = [];
    for (let i = 0; i < imageArr.length; i++) {
      if (imageArr[i].key === "") {
        imagesArrAdd.push(imageArr[i].url);
      } else {
        imagesArrNotDeleted.push(imageArr[i]);
      }
    }
    const imageArrDeleted = imageArrOriginal.filter(
      v => imagesArrNotDeleted.indexOf(v) === -1
    );
    //Delete fetched images
    for (let d = 0; d < imageArrDeleted.length; d++) {
      let urlProduct = `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}/images/${
        imageArrDeleted[d].id
      }?session=${getCookie("Session")}`;
      axios.delete(urlProduct);
    }
    //Add images
    for (let b = 0; b < imagesArrAdd.length; b++) {
      axios({
        method: "post",
        headers: { "content-type": "application/json" },
        data: JSON.stringify({ url: imagesArrAdd[b] }),
        url: `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}/images?session=${getCookie(
          "Session"
        )}`
      });
    }
    // Update Attributes
    axios({
      method: "put",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        brand: attributes.brand,
        color: attributes.color,
        weight: attributes.weight,
        size: attributes.size
      }),
      url: `
      http://localhost:8086/catalogs/categories/idCategories/subcategories/idSubcategories/products/idProducts/attributes/${
        product.attributes.id
      }?session=${getCookie("Session")}`
    });
    // Update Product
    axios({
      method: "put",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        thumbnail: product.thumbnail
      }),
      url: `http://localhost:8086/catalogs/categories/categories/subcategories/subcategories/products/${productId}?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      this.props.history.push({
        pathname: "/categories/subcategories/" + this.props.match.params.product
      });
    });
  }

  fetchProductHandler(productId) {
    let urlProduct = `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}`;
    axios.get(urlProduct).then(res => {
      this.setState({ product: res.data });
    });
    let urlAttributes = `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}/attributes`;
    axios.get(urlAttributes).then(res => {
      this.setState({ attributes: res.data });
    });
    let urlImages = `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}/images`;
    axios.get(urlImages).then(res => {
      let imageArr = [];
      for (let i = 0; i < res.data.length; i++) {
        imageArr.push(res.data[i].url);
      }
      this.setState({ imageArr: res.data, imageArrOriginal: res.data });
    });
  }
  addUrlHandler() {
    if (this.state.imageUrl !== "") {
      if (this.state.imageArr.indexOf(this.state.imageUrl) === -1) {
        this.state.imageArr.push({ key: "", url: this.state.imageUrl });
        this.setState({ errorAddImage: "", imageUrl: "" });
      } else {
        this.setState({
          errorAddImage: "Duplicate Urls.",
          errorAddImageFlash: true
        });
      }
    } else {
      this.setState({
        errorAddImage: "Invalid Url.",
        errorAddImageFlash: true
      });
    }
  }
  render() {
    return (
      <div className="EditProduct">
        <div className="product-wrapper">
          <div className="image">
            <img
              alt={this.state.product.name}
              src={this.state.product.thumbnail}
            />
          </div>
          <div className="thumbnail">
            <p className="label">Thumbnail URL:</p>
            <input
              value={this.state.product.thumbnail}
              type="text"
              placeholder="Thumbnail"
              onChange={e =>
                this.setState({
                  product: {
                    ...this.state.product,
                    thumbnail: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="name">
            <p className="label">Name:</p>
            <input
              value={this.state.product.name}
              type="text"
              placeholder="Name"
              onChange={e =>
                this.setState({
                  product: {
                    ...this.state.product,
                    name: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="price">
            <p className="label">Price:</p>
            <input
              value={this.state.product.price}
              type="number"
              placeholder="Price"
              onChange={e =>
                this.setState({
                  product: {
                    ...this.state.product,
                    price: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="quantity">
            <p className="label">Quantity:</p>
            <input
              value={this.state.product.quantity}
              type="number"
              placeholder="Quantity"
              onChange={e =>
                this.setState({
                  product: {
                    ...this.state.product,
                    quantity: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="attributes">
            <div className="brand">
              <p className="label">Brand:</p>
              <select
                value={this.state.attributes.brand}
                onChange={e =>
                  this.setState({
                    attributes: {
                      ...this.state.attributes,
                      brand: e.target.options[e.target.selectedIndex].value
                    }
                  })
                }
              >
                <option value="">All Brands</option>
                {this.props.catalog.brands.map(brand => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="color">
              <p className="label">Color:</p>
              <select
                value={this.state.attributes.color}
                onChange={e =>
                  this.setState({
                    attributes: {
                      ...this.state.attributes,
                      color: e.target.options[e.target.selectedIndex].value
                    }
                  })
                }
              >
                <option value="">All Colors</option>
                {this.props.catalog.colors.map(color => (
                  <option key={color.id} value={color.name.toLowerCase()}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="weight">
              <p className="label">Weight:</p>
              <select
                value={this.state.attributes.weight}
                onChange={e =>
                  this.setState({
                    attributes: {
                      ...this.state.attributes,
                      weight: e.target.options[e.target.selectedIndex].value
                    }
                  })
                }
              >
                <option value="">All Weights</option>
                {this.props.catalog.weights.map(weight => (
                  <option key={weight.id} value={weight.name}>
                    {weight.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="size">
              <p className="label">Size:</p>
              <select
                value={this.state.attributes.size}
                onChange={e =>
                  this.setState({
                    attributes: {
                      ...this.state.attributes,
                      size: e.target.options[e.target.selectedIndex].value
                    }
                  })
                }
              >
                <option value="">All Sizes</option>
                {this.props.catalog.sizes.map(size => (
                  <option key={size.id} value={size.name.toLowerCase()}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="description">
            <p className="label">Description:</p>
            <textarea
              type="text"
              placeholder="Description"
              value={this.state.product.description}
              onChange={e =>
                this.setState({
                  product: {
                    ...this.state.product,
                    description: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="images">
            <p className="label">Image Url:</p>
            <div className="image-wrapper">
              <input
                onChange={e => this.setState({ imageUrl: e.target.value })}
                value={this.state.imageUrl}
                type="text"
                placeholder="Image URL"
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.addUrlHandler();
                  }
                }}
              />
              <i
                onClick={() => {
                  this.addUrlHandler();
                }}
                className="fas fa-plus"
              />
            </div>
            <p
              style={{
                visibility:
                  this.state.errorAddImage !== "" ? "visible" : "hidden"
              }}
              onAnimationEnd={() =>
                this.setState({ errorAddImageFlash: false })
              }
              className={
                this.state.errorAddImageFlash ? "error flash" : "error"
              }
            >
              {this.state.errorAddImage}
            </p>
          </div>
          <TransitionGroup component="ul" className="image-list">
            {this.state.imageArr.map(image => (
              <CSSTransition key={image.url} classNames="fade" timeout={400}>
                <li className="image-url">
                  <div className="image">
                    <img src={image.url} alt={image.url} />
                  </div>
                  <div>{image.url}</div>
                  <div>
                    <i
                      className="fas fa-times"
                      onClick={() => {
                        let imageArr = [...this.state.imageArr];
                        for (let i = 0; i < imageArr.length; i++) {
                          if (imageArr[i].url === image.url) {
                            imageArr.splice(i, 1);
                          }
                        }
                        this.setState({ imageArr: imageArr });
                      }}
                    />
                  </div>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <div className="buttons">
            <button
              className="submit"
              onClick={() => {
                this.updateProductHandler(
                  this.props.match.params.product,
                  this.state.product,
                  this.state.attributes,
                  this.state.imageArr,
                  this.state.imageArrOriginal
                );
              }}
            >
              Submit
            </button>
            <button
              className="reset"
              onClick={() =>
                this.fetchProductHandler(this.props.match.params.product)
              }
            >
              Reset
            </button>
            <button
              className="cancel"
              onClick={() =>
                this.props.history.push({
                  pathname:
                    "/categories/subcategories/" +
                    this.props.match.params.product
                })
              }
            >
              Cancel
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                this.props.onremoveProduct(this.props.match.params.product);
                this.props.history.push({
                  pathname: "/"
                });
              }}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    catalog: state.catalog,
    product: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onremoveProduct: productId => dispatch(removeProduct(productId)),
    onfetchSizes: () => dispatch(fetchSizes()),
    onfetchColors: () => dispatch(fetchColors()),
    onfetchBrands: () => dispatch(fetchBrands()),
    onfetchWeights: () => dispatch(fetchWeights())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
