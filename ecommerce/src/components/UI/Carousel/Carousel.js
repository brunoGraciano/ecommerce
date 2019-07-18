import React, { Component } from "react";
import "./Carousel.css";
import Icons from "../Icons/Icons";
import banner1 from "../../../assets/banner-1.png";
import banner2 from "../../../assets/banner-2.png";
import banner3 from "../../../assets/banner-3.png";
import { Link } from "react-router-dom";

export default class Carousel extends Component {
  state = {
    slideIndex: 1
  };
  componentDidMount() {
    this.createIntervalHandler();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  createIntervalHandler() {
    this.interval = setInterval(
      () => this.nextSlideImg(this.state.slideIndex),
      4000
    );
  }
  updateSlideIndexHandler(index) {
    clearInterval(this.interval);
    this.setState({
      slideIndex: this.changeSlidesHandler(index)
    });
    this.createIntervalHandler();
  }
  nextSlideImg(index) {
    const slides = document.getElementsByClassName("mySlides");
    let slideIndex = index + 1;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    this.updateSlideIndexHandler(slideIndex);
  }
  prevSlideImg(index) {
    const slides = document.getElementsByClassName("mySlides");
    let slideIndex = index - 1;
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }
    this.updateSlideIndexHandler(slideIndex);
  }
  changeSlidesHandler(slideIndex) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    return slideIndex;
  }
  currentImageUrlHandler() {
    if (this.state.slideIndex === 1) {
      return "/f86fbfd6-676c-4982-8c4c-68bd8bc9304e/cdd8f8a8-4166-4812-b84a-06c0fc9aab3b/fire-tv-stick-4k";
    } else if (this.state.slideIndex === 2) {
      return "/b4017536-8fb9-4b69-acb5-032492f1f7c0/630a273a-711b-4f2b-8444-718c20099c3c/fire-hd-8"
    } else if (this.state.slideIndex === 3) {
      return "/b4017536-8fb9-4b69-acb5-032492f1f7c0/b7dcb1b0-d9d2-4ada-ad05-50f5bc9b3291/paperwhite"
    }
  }
  render() {
    return (
      <div className="Carousel">
        <div className="slideshow-container">
          <div className="mySlides fade" style={{ display: "block" }}>
            <img src={banner1} alt="carousel" />
          </div>
          <div className="mySlides fade">
            <img src={banner2} alt="carousel" />
          </div>
          <div className="mySlides fade">
            <img src={banner3} alt="carousel" />
          </div>

          <div className="dots">
            <span
              className="dot active"
              onClick={() => {
                this.updateSlideIndexHandler(1);
              }}
            />
            <span
              className="dot"
              onClick={() => {
                this.updateSlideIndexHandler(2);
              }}
            />
            <span
              className="dot"
              onClick={() => {
                this.updateSlideIndexHandler(3);
              }}
            />
          </div>

          <div
            className="prev-slide"
            onClick={() => {
              this.prevSlideImg(this.state.slideIndex);
            }}
          >
            <Icons type="left-arrow" className="fas" />
          </div>
          <div
            className="next-slide"
            onClick={() => {
              this.nextSlideImg(this.state.slideIndex);
            }}
          >
            <Icons type="right-arrow" />
          </div>
          <Link className="banner-btn" to={this.currentImageUrlHandler()}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }
}
