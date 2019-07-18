import React from "react";
import "./ProductsSearch.css";
import { Link } from "react-router-dom";

export default function ProductsSearch(props) {
  return (
    <div className="ProductsSearch">
      {props.products.map(product => (
        <Link
          to={"/categories/subcategories/" + product.id}
          className="product"
          key={product.id}
          onClick={() => props.cleanInput()}
        >
          <div className="img">
            <img src={product.thumbnail} alt={product.thumbnail} />
          </div>
          <div className="name">{product.name}</div>
        </Link>
      ))}
    </div>
  );
}
