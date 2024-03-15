import {
  PDF_CREATE_FAIL,
  PDF_CREATE_REQUEST,
  PDF_CREATE_SUCCESS,
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
import axios from "axios";
import { logout } from "./userActions";
import { URL } from "../Url";
import FormData from "form-data";

export const listPdf = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PDF_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/pdf/all`, config);

    dispatch({ type: PDF_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PDF_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deletePdf = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PDF_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/pdf/${id}`, config);

    dispatch({ type: PDF_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PDF_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createPdf = (name, image, file) => async (dispatch, getState) => {
  try {
    dispatch({ type: PDF_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "*/*",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${URL}/api/pdf/`,
      { name, image, file },
      config
    );

    dispatch({ type: PDF_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PDF_CREATE_FAIL,
      payload: message,
    });
  }
};

// EDIT PRODUCT
export const editPdf = (id) => async (dispatch) => {
  try {
    dispatch({ type: PDF_EDIT_REQUEST });
    const { data } = await axios.get(`${URL}/api/pdf/${id}`);
    dispatch({ type: PDF_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PDF_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updatePdf = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PDF_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/pdf/${product._id}`,
      product,
      config
    );

    dispatch({ type: PDF_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PDF_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PDF_UPDATE_FAIL,
      payload: message,
    });
  }
};
