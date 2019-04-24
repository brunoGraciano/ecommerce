import React, { Component } from "react";
import "./Categorization.css";
import { connect } from "react-redux";
import {
  fetchCatalog,
  createCategory,
  removeCategory,
  createSubcategory,
  removeSubcategory,
  editCategory,
  editSubcategory
} from "../../store/actions/indexStore";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import Modal from "../UI/Modal/Modal";

class Categorization extends Component {
  state = {
    category: "",
    categoryImg: "",
    selectedCategory: "",
    subcategory: "",
    brand: "",
    weight: "",
    size: "",
    color: "",
    isOpenCategory: true,
    isOpenSubcategory: true,
    isOpenBrand: false,
    isOpenWeight: false,
    isOpenSize: false,
    isOpenColor: false,
    selectedCategoryObj: {},
    isModalOpen: false
  };
  componentDidMount() {
    this.props.onfetchCatalog();
  }
  closeFullScreenHandler(value) {
    if (value !== "") {
      this.props.oneditCategory(this.state.selectedCategoryObj.categoryId, {
        name: this.state.selectedCategoryObj.categoryName,
        img: value
      });
    }
    this.setState({ isModalOpen: false });
  }
  postBrandHandler() {
    console.log(this.state.brand);
    this.setState({ brand: "" });
  }
  postWeightHandler() {
    console.log(this.state.weight);
    this.setState({ weight: "" });
  }
  postSizeHandler() {
    console.log(this.state.size);
    this.setState({ size: "" });
  }
  postColorHandler() {
    console.log(this.state.color);
    this.setState({ color: "" });
  }
  render() {
    return (
      <React.Fragment>
        <div className="Categorization-Height">
          <div className="Categorization">
            <table>
              <tbody>
                <tr
                  style={{
                    boxShadow: this.state.isOpenCategory
                      ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                      : null
                  }}
                  className="hover-row"
                  onClick={() =>
                    this.setState((prevState, props) => {
                      return { isOpenCategory: !prevState.isOpenCategory };
                    })
                  }
                >
                  <td>Category</td>
                  <td className="dropdown-btn-wrapper">
                    <i className="fas fa-caret-down dropdown-btn" />
                  </td>
                </tr>
                {this.state.isOpenCategory ? (
                  <tr>
                    <td colSpan="2">
                      <div className="more-info">
                        <p className="input-info">Category:</p>
                        <input
                          className="input"
                          onChange={e => {
                            this.setState({
                              category: e.target.value
                            });
                          }}
                          value={this.state.category}
                          type="text"
                          placeholder="Category"
                        />
                        <p className="input-info">Category Image:</p>
                        <input
                          className="input"
                          onChange={e => {
                            this.setState({
                              categoryImg: e.target.value
                            });
                          }}
                          value={this.state.categoryImg}
                          type="text"
                          placeholder="Category Image"
                        />
                        <div className="buttons">
                          <button
                            className="submit"
                            onClick={() =>
                              this.props.oncreateCategory(
                                this.state.category,
                                this.state.categoryImg
                              )
                            }
                          >
                            Submit
                          </button>
                          <button
                            className="reset"
                            onClick={() =>
                              this.setState({ category: "", categoryImg: "" })
                            }
                          >
                            Reset
                          </button>
                        </div>
                        <TransitionGroup component="ul" className="list-ul">
                          {this.props.catalog.catalog.map(category => (
                            <CSSTransition
                              key={category.id}
                              classNames="fade"
                              timeout={400}
                            >
                              <li className="list-li">
                                <input
                                  className="input-edit"
                                  value={category.name}
                                  onChange={e => {
                                    this.props.oneditCategory(category.id, {
                                      name: e.target.value,
                                      img: category.img
                                    });
                                  }}
                                />
                                <div className="btn-icon">
                                  <i
                                    className="fas fa-camera camera"
                                    onClick={() => {
                                      this.setState({
                                        selectedCategoryObj: {
                                          categoryId: category.id,
                                          categoryName: category.name
                                        },
                                        isModalOpen: true
                                      });
                                    }}
                                  />
                                  <i
                                    className="fas fa-times close"
                                    onClick={() => {
                                      this.props.onremoveCategory(category.id);
                                    }}
                                  />
                                </div>
                              </li>
                            </CSSTransition>
                          ))}
                        </TransitionGroup>
                      </div>
                    </td>
                  </tr>
                ) : null}
                <tr
                  style={{
                    boxShadow: this.state.isOpenSubcategory
                      ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                      : null
                  }}
                  className="hover-row"
                  onClick={() =>
                    this.setState((prevState, props) => {
                      return {
                        isOpenSubcategory: !prevState.isOpenSubcategory
                      };
                    })
                  }
                >
                  <td>Subcategory</td>
                  <td className="dropdown-btn-wrapper">
                    <i className="fas fa-caret-down dropdown-btn" />
                  </td>
                </tr>
                {this.state.isOpenSubcategory ? (
                  <tr>
                    <td colSpan="2">
                      <div className="more-info">
                        <p className="input-info">Category:</p>
                        <select
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
                        <p className="input-info">Subcategory:</p>
                        <input
                          className="input"
                          onChange={e => {
                            this.setState({
                              subcategory: e.target.value
                            });
                          }}
                          value={this.state.subcategory}
                          type="text"
                          placeholder="Subcategory"
                          onKeyPress={e => {
                            if (e.key === "Enter") {
                              this.props.oncreateSubcategory(
                                this.state.selectedCategory === ""
                                  ? this.props.catalog.catalog[0].id
                                  : this.state.selectedCategory,
                                this.state.subcategory
                              );
                            }
                          }}
                        />
                        <div className="buttons">
                          <button
                            className="submit"
                            onClick={() =>
                              this.props.oncreateSubcategory(
                                this.state.selectedCategory === ""
                                  ? this.props.catalog.catalog[0].id
                                  : this.state.selectedCategory,
                                this.state.subcategory
                              )
                            }
                          >
                            Submit
                          </button>
                          <button
                            className="reset"
                            onClick={() => this.setState({ subcategory: "" })}
                          >
                            Reset
                          </button>
                        </div>
                        <TransitionGroup component="ul" className="list-ul">
                          {this.props.catalog.catalog.map((category, index) => {
                            if (category.id === this.state.selectedCategory) {
                              return category.subcategories.map(subcategory => (
                                <CSSTransition
                                  key={subcategory.id}
                                  classNames="fade"
                                  timeout={400}
                                >
                                  <li className="list-li">
                                    <input
                                      className="input-edit"
                                      value={subcategory.name}
                                      onChange={e => {
                                        this.props.oneditSubcategory(
                                          category.id,
                                          subcategory.id,
                                          {
                                            name: e.target.value
                                          }
                                        );
                                      }}
                                    />
                                    <div className="btn-icon">
                                      <i
                                        className="fas fa-times close"
                                        onClick={() => {
                                          this.props.onremoveSubcategory(
                                            category.id,
                                            subcategory.id
                                          );
                                        }}
                                      />
                                    </div>
                                  </li>
                                </CSSTransition>
                              ));
                            }
                            if (
                              this.state.selectedCategory === "" &&
                              index === 0
                            ) {
                              return category.subcategories.map(subcategory => (
                                <CSSTransition
                                  key={subcategory.id}
                                  classNames="fade"
                                  timeout={400}
                                >
                                  <li className="list-li">
                                    <input
                                      className="input-edit"
                                      value={subcategory.name}
                                      onChange={e => {
                                        this.props.oneditSubcategory(
                                          category.id,
                                          subcategory.id,
                                          {
                                            name: e.target.value
                                          }
                                        );
                                      }}
                                    />
                                    <div className="btn-icon">
                                      <i
                                        className="fas fa-times close"
                                        onClick={() => {
                                          this.props.onremoveSubcategory(
                                            category.id,
                                            subcategory.id
                                          );
                                        }}
                                      />
                                    </div>
                                  </li>
                                </CSSTransition>
                              ));
                            }
                            return null;
                          })}
                        </TransitionGroup>
                      </div>
                    </td>
                  </tr>
                ) : null}
                {/* 
              <tr
                style={{
                  boxShadow: this.state.isOpenBrand
                    ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                    : null
                }}
                className="hover-row"
                onClick={() =>
                  this.setState((prevState, props) => {
                    return { isOpenBrand: !prevState.isOpenBrand };
                  })
                }
              >
                <td>Brand</td>
                <td className="dropdown-btn-wrapper">
                  <i className="fas fa-caret-down dropdown-btn" />
                </td>
              </tr>
              {this.state.isOpenBrand ? (
                <tr>
                  <td colSpan="2">
                    <div className="more-info">
                      <p className="input-info">Brand:</p>
                      <input
                        onChange={e => {
                          this.setState({
                            brand: e.target.value
                          });
                        }}
                        value={this.state.brand}
                        type="text"
                        placeholder="Brand"
                      />
                      <div className="buttons">
                        <button
                          className="submit"
                          onClick={() => this.postBrandHandler()}
                        >
                          Submit
                        </button>
                        <button
                          className="reset"
                          onClick={() => this.setState({ brand: "" })}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              <tr
                style={{
                  boxShadow: this.state.isOpenWeight
                    ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                    : null
                }}
                className="hover-row"
                onClick={() =>
                  this.setState((prevState, props) => {
                    return { isOpenWeight: !prevState.isOpenWeight };
                  })
                }
              >
                <td>Weight</td>
                <td className="dropdown-btn-wrapper">
                  <i className="fas fa-caret-down dropdown-btn" />
                </td>
              </tr>
              {this.state.isOpenWeight ? (
                <tr>
                  <td colSpan="2">
                    <div className="more-info">
                      <p className="input-info">Weight:</p>
                      <input
                        onChange={e => {
                          this.setState({
                            weight: e.target.value
                          });
                        }}
                        value={this.state.weight}
                        type="text"
                        placeholder="Weight"
                      />
                      <div className="buttons">
                        <button
                          className="submit"
                          onClick={() => this.postWeightHandler()}
                        >
                          Submit
                        </button>
                        <button
                          className="reset"
                          onClick={() => this.setState({ weight: "" })}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              <tr
                style={{
                  boxShadow: this.state.isOpenSize
                    ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                    : null
                }}
                className="hover-row"
                onClick={() =>
                  this.setState((prevState, props) => {
                    return { isOpenSize: !prevState.isOpenSize };
                  })
                }
              >
                <td>Size</td>
                <td className="dropdown-btn-wrapper">
                  <i className="fas fa-caret-down dropdown-btn" />
                </td>
              </tr>
              {this.state.isOpenSize ? (
                <tr>
                  <td colSpan="2">
                    <div className="more-info">
                      <p className="input-info">Size:</p>
                      <input
                        onChange={e => {
                          this.setState({
                            size: e.target.value
                          });
                        }}
                        value={this.state.size}
                        type="text"
                        placeholder="Size"
                      />
                      <div className="buttons">
                        <button
                          className="submit"
                          onClick={() => this.postSizeHandler()}
                        >
                          Submit
                        </button>
                        <button
                          className="reset"
                          onClick={() => this.setState({ size: "" })}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              <tr
                style={{
                  boxShadow: this.state.isOpenColor
                    ? "0px 0px 10px 1px rgba(0, 0, 0, 0.08)"
                    : null
                }}
                className="hover-row"
                onClick={() =>
                  this.setState((prevState, props) => {
                    return { isOpenColor: !prevState.isOpenColor };
                  })
                }
              >
                <td>Color</td>
                <td className="dropdown-btn-wrapper">
                  <i className="fas fa-caret-down dropdown-btn" />
                </td>
              </tr>
              {this.state.isOpenColor ? (
                <tr>
                  <td colSpan="2">
                    <div className="more-info">
                      <p className="input-info">Color:</p>
                      <input
                        onChange={e => {
                          this.setState({
                            color: e.target.value
                          });
                        }}
                        value={this.state.color}
                        type="text"
                        placeholder="Color"
                      />
                      <div className="buttons">
                        <button
                          className="submit"
                          onClick={() => this.postColorHandler()}
                        >
                          Submit
                        </button>
                        <button
                          className="reset"
                          onClick={() => this.setState({ color: "" })}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              */}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.isModalOpen ? (
          <Modal
            closeFullscreen={value => {
              this.closeFullScreenHandler(value);
            }}
          />
        ) : null}
      </React.Fragment>
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
    onfetchCatalog: () => dispatch(fetchCatalog()),
    oncreateCategory: (name, imageUrl) =>
      dispatch(createCategory(name, imageUrl)),
    onremoveCategory: categoryId => dispatch(removeCategory(categoryId)),
    oncreateSubcategory: (subcategoryId, subcategoryName) =>
      dispatch(createSubcategory(subcategoryId, subcategoryName)),
    onremoveSubcategory: (categoryId, subcategoryId) =>
      dispatch(removeSubcategory(categoryId, subcategoryId)),
    oneditCategory: (categoryId, category) =>
      dispatch(editCategory(categoryId, category)),
    oneditSubcategory: (categoryId, subcategoryId, subcategory) =>
      dispatch(editSubcategory(categoryId, subcategoryId, subcategory))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categorization);
