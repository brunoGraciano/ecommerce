import React, { Component } from "react";
import "./Home.css";
import Carousel from "../UI/Carousel/Carousel";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductsHome from "../ProductsHome/ProductsHome";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="home">
          <div className="home-wrapper">
            <div className="greeting">
              {this.props.user.authenticatedUser.name === undefined
                ? null
                : `Hello, ${this.props.user.authenticatedUser.name} ${
                    this.props.user.authenticatedUser.surname
                  }`}
            </div>
            <div className="home-links">
              <Link to="/">Prime</Link>
              <Link to="/">Fresh</Link>
              <Link to="/">Video</Link>
              <Link to="/">Music</Link>
            </div>
          </div>
        </div>
        <Carousel />
        <ProductsHome
          linkImg={
            "https://images.unsplash.com/photo-1549206464-82c129240d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          }
          link={
            "/5ceabe7f-a61f-4cd7-bacc-e1ed837811be/c93b538a-fa4d-4b6e-889b-c54df57e2129"
          }
          title={"Are you ready for christmas?"}
          description={"We have created a selection of items you will adore."}
          invert={false}
        />
        <ProductsHome
          linkImg={
            "https://images.unsplash.com/photo-1498661705887-3778d9ecb4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          }
          link={
            "/7c2be2c8-8560-4406-a093-e9dbb10aa396/251c2e9d-08d1-48aa-9267-85aeb3f88519"
          }
          title={"Are you ready for christmas?"}
          description={"We have created a selection of items you will adore."}
          invert={true}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
