import React from "react";
import "./ProductsHome.css";
import { Link } from "react-router-dom";

export default function ProductsHome(props) {
  return (
    <div
      className="ProductsHome"
      style={{ gridTemplateColumns: props.invert ? "2fr 3fr" : "3fr 2fr" }}
    >
      <Link to={props.link}>
        <img
          src={props.linkImg}
          alt={props.title}
          style={{ gridColumn: props.invert ? "2 / span 1" : "1 / span 1" }}
        />
      </Link>
      <div
        className="info-product-home"
        style={{
          gridColumn: props.invert ? "1 / span 1" : "2 / span 1",
          gridRow: props.invert ? "1 / span 1" : "1 / span 1"
        }}
      >
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
