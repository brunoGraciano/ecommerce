import React, { Component } from "react";
import "./CreateProduct.css";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import { connect } from "react-redux";
import {
  addProduct,
  fetchSizes,
  fetchWeights,
  fetchBrands,
  fetchColors
} from "../../store/actions/indexStore";

class CreateProduct extends Component {
  state = {
    selectedCategory: "",
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
    errorAddImage: "",
    errorAddImageFlash: false,
    error: ""
  };
  componentDidMount() {
    this.props.onfetchSizes();
    this.props.onfetchColors();
    this.props.onfetchWeights();
    this.props.onfetchBrands();
  }
  resetFieldsHandler() {
    this.setState({
      product: {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        thumbnail: ""
      },
      imageUrl: "",
      imageArr: []
    });
  }

  addUrlHandler() {
    if (this.state.imageUrl !== "") {
      if (this.state.imageArr.indexOf(this.state.imageUrl) === -1) {
        this.state.imageArr.push(this.state.imageUrl);
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
      <div className="CreateProduct">
        <div className="product-wrapper">
          <div className="categories">
            <p className="label">Category</p>
            <select
              ref="categoryCreateProduct"
              onChange={e =>
                this.setState({
                  selectedCategory:
                    e.target.options[e.target.selectedIndex].value
                })
              }
            >
              {this.props.catalog.catalog.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="subcategories">
            <p className="label">Subcategory</p>
            <select ref="subcategoryCreateProduct">
              {this.props.catalog.catalog.map((category, index) => {
                if (
                  category.id === this.state.selectedCategory ||
                  (this.state.selectedCategory === "" && index === 0)
                ) {
                  return category.subcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ));
                }
                return null;
              })}
            </select>
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
          {this.state.product.thumbnail !== "" ? (
            <div className="image-thumbnail">
              <img src={this.state.product.thumbnail} alt="Invalid Thumbnail" />
            </div>
          ) : null}
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
            {this.state.imageArr.map(url => (
              <CSSTransition key={url} classNames="fade" timeout={400}>
                <li className="image-url">
                  <div className="image">
                    <img src={url} alt={url} />
                  </div>
                  <div>{url}</div>
                  <div>
                    <i
                      className="fas fa-times"
                      onClick={() => {
                        let imageArr = this.state.imageArr;
                        imageArr.splice(imageArr.indexOf(url), 1);
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
                const categoryId = this.refs.categoryCreateProduct.value;
                const subcategoryId = this.refs.subcategoryCreateProduct.value;
                this.props.onaddProduct(
                  categoryId,
                  subcategoryId,
                  this.state.product,
                  this.state.attributes,
                  this.state.imageArr
                );
                this.resetFieldsHandler();
              }}
            >
              Submit
            </button>
            <button className="reset" onClick={() => this.resetFieldsHandler()}>
              Reset
            </button>
            <button
              className="cancel"
              onClick={() => this.props.history.push({ pathname: "/" })}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    catalog: state.catalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onaddProduct: (categoryId, subcategoryId, product, attributes, imageArr) =>
      dispatch(
        addProduct(categoryId, subcategoryId, product, attributes, imageArr)
      ),
    onfetchSizes: () => dispatch(fetchSizes()),
    onfetchColors: () => dispatch(fetchColors()),
    onfetchBrands: () => dispatch(fetchBrands()),
    onfetchWeights: () => dispatch(fetchWeights())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct);
