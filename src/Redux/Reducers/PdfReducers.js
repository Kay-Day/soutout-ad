import {
  PDF_CREATE_FAIL,
  PDF_CREATE_REQUEST,
  PDF_CREATE_SUCCESS,
  PDF_CREATE_RESET,
  PDF_UPDATE_RESET,
  PDF_DELETE_FAIL,
  PDF_DELETE_REQUEST,
  PDF_DELETE_SUCCESS,
  PDF_EDIT_FAIL,
  PDF_EDIT_REQUEST,
  PDF_EDIT_SUCCESS,
  PDF_LIST_FAIL,
  PDF_LIST_REQUEST,
  PDF_LIST_SUCCESS,
  PDF_UPDATE_FAIL,
  PDF_UPDATE_REQUEST,
  PDF_UPDATE_SUCCESS,
} from "../Constants/PdfContants";

// ALL PRODUCTS
export const pdfListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PDF_LIST_REQUEST:
      return { loading: true, products: [] };
    case PDF_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PDF_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const pdfDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PDF_DELETE_REQUEST:
      return { loading: true };
    case PDF_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PDF_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const pdfCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PDF_CREATE_REQUEST:
      return { loading: true };
    case PDF_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PDF_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PDF_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT PRODUCT
export const pdfEditReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PDF_EDIT_REQUEST:
      return { ...state, loading: true };
    case PDF_EDIT_SUCCESS:
      return { loading: false, product: action.payload };
    case PDF_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const pdfUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PDF_UPDATE_REQUEST:
      return { loading: true };
    case PDF_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PDF_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PDF_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
