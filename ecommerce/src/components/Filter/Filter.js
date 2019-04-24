import React, { Component } from "react";
import "./Filter.css";
import { connect } from "react-redux";
import {
  fetchSizes,
  fetchWeights,
  fetchBrands,
  fetchColors
} from "../../store/actions/indexStore";

class Filter extends Component {
  componentDidMount() {
    this.props.onfetchSizes();
    this.props.onfetchColors();
    this.props.onfetchWeights();
    this.props.onfetchBrands();
  }
  render() {
    return (
      <div className="Filter">
        <div className="select-style">
          <select onChange={e => this.props.brandParams(e.target.value)}>
            <option value="All">All Brands</option>
            {this.props.catalog.brands.map(brand => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          <i className="fas fa-angle-down dropdown-arrow" />
        </div>
        <div className="select-style">
          <select onChange={e => this.props.colorParams(e.target.value)}>
            <option value="All">All Colores</option>
            {this.props.catalog.colors.map(color => (
              <option key={color.id} value={color.name.toLowerCase()}>
                {color.name}
              </option>
            ))}
          </select>
          <i className="fas fa-angle-down dropdown-arrow" />
        </div>
        <div className="select-style">
          <select onChange={e => this.props.weightParams(e.target.value)}>
            <option value="All">All Weights</option>
            {this.props.catalog.weights.map(weight => (
              <option key={weight.id} value={weight.name}>
                {weight.name}
              </option>
            ))}
          </select>
          <i className="fas fa-angle-down dropdown-arrow" />
        </div>
        <div className="select-style">
          <select onChange={e => this.props.sizeParams(e.target.value)}>
            <option value="All">All Sizes</option>
            {this.props.catalog.sizes.map(size => (
              <option key={size.id} value={size.name.toLowerCase()}>
                {size.name}
              </option>
            ))}
          </select>
          <i className="fas fa-angle-down dropdown-arrow" />
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
    onfetchSizes: () => dispatch(fetchSizes()),
    onfetchColors: () => dispatch(fetchColors()),
    onfetchBrands: () => dispatch(fetchBrands()),
    onfetchWeights: () => dispatch(fetchWeights())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
