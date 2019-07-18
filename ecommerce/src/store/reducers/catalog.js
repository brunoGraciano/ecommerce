import * as actionTypes from "../actions/actionTypes";

const catalog = {
  catalog: [],
  sizes: [],
  colors: [],
  weights: [],
  brands: []
};

const fetchCatalog = (state, action) => {
  return {
    ...state,
    catalog: action.catalog
  };
};
const fetchSizes = (state, action) => {
  return {
    ...state,
    sizes: action.sizes
  };
};
const fetchColors = (state, action) => {
  return {
    ...state,
    colors: action.colors
  };
};
const fetchWeights = (state, action) => {
  return {
    ...state,
    weights: action.weights
  };
};
const fetchBrands = (state, action) => {
  return {
    ...state,
    brands: action.brands
  };
};
const fetchCatalogFailed = (state, action) => {
  return {};
};

const reducer = (state = catalog, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATALOG:
      return fetchCatalog(state, action);
    case actionTypes.FETCH_CATALOG_FAILED:
      return fetchCatalogFailed(state, action);
    case actionTypes.FETCH_SIZES:
      return fetchSizes(state, action);
    case actionTypes.FETCH_COLORS:
      return fetchColors(state, action);
    case actionTypes.FETCH_WEIGHTS:
      return fetchWeights(state, action);
    case actionTypes.FETCH_BRANDS:
      return fetchBrands(state, action);
    default:
      return state;
  }
};

export default reducer;
