import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getCookie } from "../../components/Util/Util";

export const addProduct = (
  categoryId,
  subcategoryId,
  product,
  attributes,
  imageArr
) => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify(product),
      url: `http://localhost:8086/catalogs/categories/${categoryId}/subcategories/${subcategoryId}/products?session=${getCookie(
        "Session"
      )}`
    })
      .then(res => {
        const productId = product.name
          .toLowerCase()
          .split(" ")
          .join("-");
        if (res.status === 201) {
          axios({
            method: "post",
            headers: { "content-type": "application/json" },
            data: JSON.stringify(attributes),
            url: `http://localhost:8086/catalogs/categories/${categoryId}/subcategories/${subcategoryId}/products/${productId}/attributes?session=${getCookie(
              "Session"
            )}`
          })
            .then(res => {})
            .catch(error => {
              dispatch({ error: error.response.data.message });
            });
          for (let i = 0; i < imageArr.length; i++) {
            let url = imageArr[i];
            axios({
              method: "post",
              headers: { "content-type": "application/json" },
              data: JSON.stringify({ url: url }),
              url: `http://localhost:8086/catalogs/categories/${categoryId}/subcategories/${subcategoryId}/products/${productId}/images?session=${getCookie(
                "Session"
              )}`
            })
              .then(res => {})
              .catch(error => {
                dispatch({ error: error.response.data.message });
              });
          }
        }
      })
      .catch(error => {
        dispatch({
          error: error.response.data.message
        });
      });
  };
};
export const removeProduct = productId => {
  return dispatch => {
    const urlProduct = `http://localhost:8086/catalogs/categories/audio/subcategories/headphones/products/${productId}?session=${getCookie(
      "Session"
    )}`;

    axios.delete(urlProduct).then(res => {});
    dispatch({ type: actionTypes.REMOVE_PRODUCT });
  };
};
