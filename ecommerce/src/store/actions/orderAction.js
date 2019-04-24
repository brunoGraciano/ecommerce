import * as actionTypes from "./actionTypes";
import axios from "axios";

export const updateProductOrderQuantity = (inputValue, productId, products) => {
  let productsState = [...products];
  let productsLs = localStorage.getItem("product").split(",");
  let quantityLs = localStorage.getItem("quantity").split(",");
  const index = productsLs.indexOf(productId);
  if (inputValue < 1) {
    quantityLs.splice(index, 1);
    productsLs.splice(index, 1);
    localStorage.setItem("quantity", quantityLs);
    localStorage.setItem("product", productsLs);
    productsState.splice(index, 1);
  } else {
    quantityLs[index] = inputValue;
    localStorage.setItem("quantity", quantityLs);
    for (let p = 0; p < products.length; p++) {
      if (productsState[p].id === productId) {
        productsState[p].quantityCart = inputValue;
      }
    }
  }
  return {
    type: actionTypes.UPDATE_PRODUCT_ORDER_QUANTITY,
    products: productsState,
    total: calculateTotal(quantityLs)
  };
};

export const addProductOrder = productId => {
  let products = localStorage.getItem("product");
  let quantity = localStorage.getItem("quantity");
  let arrProducts = [];
  let arrQuantity = [];
  if (products !== null && products !== "") {
    arrProducts = products.split(",");
    arrQuantity = quantity.split(",");
    if (arrProducts.indexOf(productId) === -1) {
      arrProducts.push(productId);
      arrQuantity.push(1);
    } else {
      const indexOfProduct = arrProducts.indexOf(productId);
      let prevQuantity = parseInt(arrQuantity[indexOfProduct], 10) + 1;
      arrQuantity[indexOfProduct] = prevQuantity;
    }
  } else {
    arrProducts = [productId];
    arrQuantity = [1];
  }
  localStorage.setItem("product", arrProducts);
  localStorage.setItem("quantity", arrQuantity);
  return {
    type: actionTypes.ADD_PRODUCT_ORDER,
    products: arrProducts,
    total: calculateTotal(arrQuantity)
  };
};

export const fetchProductOrder = () => {
  return dispatch => {
    if (localStorage.getItem("product") !== null) {
      let products = localStorage.getItem("product").split(",");
      axios({
        method: "post",
        headers: { "content-type": "application/json" },
        data: products,
        url: "http://localhost:8086/products/arr"
      }).then(res => {
        let quantityLs = localStorage.getItem("quantity").split(",");
        let productsState = [...res.data];
        for (let p = 0; p < productsState.length; p++) {
          productsState[p].quantityCart = quantityLs[p];
        }
        dispatch({
          type: actionTypes.FETCH_PRODUCT_ORDER,
          products: productsState,
          total: calculateTotal(quantityLs)
        });
      });
    }
  };
};

const calculateTotal = arrQuantity => {
  let total = 0;
  for (let q = 0; q < arrQuantity.length; q++) {
    total += parseInt(arrQuantity[q], 10);
  }
  return total;
};
