import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function Product(props) {
  return (
    <Link to={"/" + props.categories + "/" + props.subcategories + "/" + props.id} className="Product">
      <div className="frame-img">
        <img src={props.img} alt={props.name} />
      </div>
      <div className="info">
        <p className="name">
          {props.name} by <span className="bold">{props.brand}</span>{" "}
        </p>
        <p className="bold">{props.price} €</p>
      </div>
    </Link>
  );
}
