import * as actionTypes from "../actions/actionTypes";

const order = {
  products: [],
  total: 0
};

const addProductOrder = (state, action) => {
  return {
    products: state.products,
    total: action.total
  };
};
const updateProductOrderQuantity = (state, action) => {
  return {
    products: action.products,
    total: action.total
  };
};
const fetchProductOrder = (state, action) => {
  return {
    products: action.products,
    total: action.total
  };
};

const reducer = (state = order, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_ORDER:
      return addProductOrder(state, action);
    case actionTypes.UPDATE_PRODUCT_ORDER_QUANTITY:
      return updateProductOrderQuantity(state, action);
    case actionTypes.FETCH_PRODUCT_ORDER:
      return fetchProductOrder(state, action);
    default:
      return state;
  }
};

export default reducer;
