import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getCookie } from "../../components/Util/Util";

export const fetchCatalog = () => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/categories`;
    axios
      .get(url)
      .then(res => {
        dispatch(setCatalog(res.data));
      })
      .catch(err => {
        dispatch(fetchCatalogFailed());
      });
  };
};
export const fetchSizes = () => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/sizes`;
    axios.get(url).then(res => {
      dispatch({
        type: actionTypes.FETCH_SIZES,
        sizes: res.data
      });
    });
  };
};
export const fetchColors = () => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/colors`;
    axios.get(url).then(res => {
      dispatch({
        type: actionTypes.FETCH_COLORS,
        colors: res.data
      });
    });
  };
};
export const fetchWeights = () => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/weights`;
    axios.get(url).then(res => {
      dispatch({
        type: actionTypes.FETCH_WEIGHTS,
        weights: res.data
      });
    });
  };
};
export const fetchBrands = () => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/brands`;
    axios.get(url).then(res => {
      dispatch({
        type: actionTypes.FETCH_BRANDS,
        brands: res.data
      });
    });
  };
};
export const setCatalog = catalog => {
  return {
    type: actionTypes.FETCH_CATALOG,
    catalog: catalog
  };
};

export const fetchCatalogFailed = () => {
  return {
    type: actionTypes.FETCH_CATALOG_FAILED
  };
};

export const createBrand = name => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: name
      }),
      url: `http://localhost:8090/catalog/catalogs/brands?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchBrands());
    });
  };
};
export const removeBrand = id => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/brands/${id}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchBrands());
    });
  };
};
export const editBrand = (id, name) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/brands/${id}?session=${getCookie(
          "Session"
        )}`,
        name
      )
      .then(res => {
        dispatch(fetchBrands());
      });
  };
};
export const createWeight = name => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: name
      }),
      url: `http://localhost:8090/catalog/catalogs/weights?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchWeights());
    });
  };
};
export const removeWeight = id => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/weights/${id}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchWeights());
    });
  };
};
export const editWeight = (id, name) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/weights/${id}?session=${getCookie(
          "Session"
        )}`,
        name
      )
      .then(res => {
        dispatch(fetchWeights());
      });
  };
};
export const createSize = name => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: name
      }),
      url: `http://localhost:8090/catalog/catalogs/sizes?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchSizes());
    });
  };
};
export const removeSize = id => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/sizes/${id}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchSizes());
    });
  };
};
export const editSize = (id, name) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/sizes/${id}?session=${getCookie(
          "Session"
        )}`,
        name
      )
      .then(res => {
        dispatch(fetchSizes());
      });
  };
};
export const createColor = name => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: name
      }),
      url: `http://localhost:8090/catalog/catalogs/colors?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchColors());
    });
  };
};
export const removeColor = id => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/colors/${id}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchColors());
    });
  };
};
export const editColor = (id, name) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/colors/${id}?session=${getCookie(
          "Session"
        )}`,
        name
      )
      .then(res => {
        dispatch(fetchColors());
      });
  };
};
export const createCategory = (name, imageUrl) => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({
        name: name,
        img: imageUrl
      }),
      url: `http://localhost:8090/catalog/catalogs/categories?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchCatalog());
    });
  };
};

export const removeCategory = categoryId => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/categories/${categoryId}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchCatalog());
    });
  };
};

export const createSubcategory = (categoryId, subcategory) => {
  return dispatch => {
    axios({
      method: "post",
      headers: { "content-type": "application/json" },
      data: JSON.stringify({ name: subcategory }),
      url: `http://localhost:8090/catalog/catalogs/categories/${categoryId}/subcategories?session=${getCookie(
        "Session"
      )}`
    }).then(res => {
      dispatch(fetchCatalog());
    });
  };
};

export const removeSubcategory = (categoryId, subcategoryId) => {
  return dispatch => {
    let url = `http://localhost:8090/catalog/catalogs/categories/categoryId/subcategories/${subcategoryId}?session=${getCookie(
      "Session"
    )}`;
    axios.delete(url).then(res => {
      dispatch(fetchCatalog());
    });
  };
};

export const editCategory = (categoryId, category) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/categories/${categoryId}?session=${getCookie(
          "Session"
        )}`,
        category
      )
      .then(res => {
        dispatch(fetchCatalog());
      });
  };
};

export const editSubcategory = (categoryId, subcategoryId, subcategory) => {
  return dispatch => {
    axios
      .put(
        `http://localhost:8090/catalog/catalogs/categories/${categoryId}/subcategories/${subcategoryId}?session=${getCookie(
          "Session"
        )}`,
        subcategory
      )
      .then(res => {
        dispatch(fetchCatalog());
      });
  };
};
