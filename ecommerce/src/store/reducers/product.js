import * as actionTypes from "../actions/actionTypes";

const product = {
  product: {}
};

const addProduct = (state, action) => {
  return {};
};
const fetchProduct = (state, action) => {
  return {
    product: action.product
  };
};
const removeProduct = (state, action) => {
  return {};
};

const reducer = (state = product, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    case actionTypes.FETCH_PRODUCT:
      return fetchProduct(state, action);
    case actionTypes.REMOVE_PRODUCT:
      return removeProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
