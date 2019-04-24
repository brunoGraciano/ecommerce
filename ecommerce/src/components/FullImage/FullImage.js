import React, { Component } from "react";
import "./FullImage.css";
import Backdrop from "../UI/Backdrop/Backdrop";

export default class FullImage extends Component {
  imagesArrSize = this.props.images.length - 1;
  state = {
    currentImgIndex: this.props.imgIndex
  };

  render() {
    return (
      <React.Fragment>
        <div className="FullImage">
          <div className="button-left-fullscreen">
            <i
              className="fas fa-arrow-left arrow-fullscreen"
              onClick={() => {
                if (this.state.currentImgIndex === 0) {
                  this.setState({ currentImgIndex: this.imagesArrSize });
                } else {
                  this.setState((prevState, props) => {
                    return { currentImgIndex: prevState.currentImgIndex - 1 };
                  });
                }
              }}
            />
          </div>
          <div className="center-img full-image">
            <img
              src={this.props.images[this.state.currentImgIndex].url}
              alt={this.props.images[this.state.currentImgIndex].id}
            />
          </div>
          <div className="button-right-fullscreen">
            <i
              className="fas fa-arrow-right arrow-fullscreen"
              onClick={() => {
                if (this.state.currentImgIndex === this.imagesArrSize) {
                  this.setState({ currentImgIndex: 0 });
                } else {
                  this.setState((prevState, props) => {
                    return { currentImgIndex: prevState.currentImgIndex + 1 };
                  });
                }
              }}
            />
          </div>
        </div>
        <Backdrop
          {...this.props}
          currentImgIndex={this.state.currentImgIndex}
        />
      </React.Fragment>
    );
  }
}
