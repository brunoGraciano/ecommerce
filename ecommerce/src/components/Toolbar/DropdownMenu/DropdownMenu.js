import React, { Component } from "react";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCatalog } from "../../../store/actions/indexStore";

class DropdownMenu extends Component {
  componentDidMount() {
    this.props.onfetchCatalog();
  }
  render() {
    return (
      <div className="DropdownMenu">
        <div className="category">
          {this.props.catalog.catalog.map(category => (
            <div key={category.id} className="dropdown">
              <div className="dropbtn">{category.name}</div>
              <div className="dropdown-content">
                <div className="dropdown-layout">
                  <div className="menu">
                    {category.subcategories.map(subcategory => (
                      <Link
                        key={subcategory.id}
                        to={"/" + category.id + "/" + subcategory.id}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                  <div className="image">
                    <img src={category.img} alt={category.name} />
                  </div>
                </div>
                <div />
              </div>
            </div>
          ))}
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
    onfetchCatalog: () => dispatch(fetchCatalog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownMenu);
