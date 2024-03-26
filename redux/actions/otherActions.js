import axios from "axios";
import { server } from "../store";

export const updatePic = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePicRequest",
    });

    // Axios request

    const { data } = await axios.put(
      `${server}/user/updatepic`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "updatePicSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePicFail",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios.put(
        `${server}/user/changepassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile =
  (name, email, address, city, country, pinCode) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const { data } = await axios.put(
        `${server}/user/updateprofile`,
        {
          name,
          email,
          address,
          city,
          country,
          pinCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFail",
        payload: error.response.data.message,
      });
    }
  };

export const placeOrder =
  (
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    paymentInfo
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "placeOrderRequest",
      });

      const { data } = await axios.post(
        `${server}/order/new`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: "placeOrderSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "placeOrderFail",
        payload: error.response.data.message,
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "processOrderRequest",
    });

    const { data } = await axios.put(
      `${server}/order/single/${id}`,

      {},
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "processOrderSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "processOrderFail",
      payload: error.response.data.message,
    });
  }
};

//Category==================================================================
export const addCategory = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addCategoryRequest",
    });

    const { data } = await axios.post(`${server}/category/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "addCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
    
  try {
      dispatch({
          type: "getCategoryDetailsRequest",
      })

      // Axios request
      const { data } = await axios.get(`${server}/category/single/${id}`, {
          withCredentials: true
      })

      console.log("Category details fetched successfully:", data.category);

      dispatch({
          type: "getCategoryDetailsSuccess",
          payload: data.category
      })


  } catch (error) {
      
      dispatch({
          type: "getCategoryDetailsFail",
          payload: error.response.data.message
      })
  }

}


export const updateCategory =
  (id, category) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCategoryRequest",
      });
      const { data } = await axios.put(
        `${server}/category/single/${id}`,
        {
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateCategorySuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

  
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCategoryRequest",
    });

    const { data } = await axios.delete(
      `${server}/category/single/${id}`,

      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFail",
      payload: error.response.data.message,
    });
  }
};


export const updateCategoryImage = (categoryId, formData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCategoryImageRequest",
    });

    const { data } = await axios.post(
      `${server}/category/images/${categoryId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "updateCategoryImageSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCategoryImageFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteCategoryImage = (categoryId, imageId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCategoryImageRequest",
    });

    const { data } = await axios.delete(
      `${server}/category/images/${categoryId}?id=${imageId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteCategoryImageSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCategoryImageFail",
      payload: error.response.data.message,
    });
  }
};
//Category==================================================================


export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addProductRequest",
    });

    const { data } = await axios.post(`${server}/product/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "addProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addProductFail",
      payload: error.response.data.message,
    });
  }
};

export const addComment = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.post(`${server}/comment/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Log the data if the request is successful
    console.log("Data after comment addition:", data);

    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFail",
      payload: error.response.data.message,
    });
  }
};


export const updateProduct =
  (id, name, description, price, stock, category) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProductRequest",
      });
      const { data } = await axios.put(
        `${server}/product/single/${id}`,
        {
          name,
          description,
          price,
          stock,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateProductImage = (productId, formData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductImageRequest",
    });

    const { data } = await axios.post(
      `${server}/product/images/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "updateProductImageSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProductImageFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProductImage = (productId, imageId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductImageRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/images/${productId}?id=${imageId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductImageSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductImageFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete/${userId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/single/${productId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};


export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordRequest",
    });
    const { data } = await axios.post(
      `${server}/user/forgetpassword`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "forgetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (otp, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });
    const { data } = await axios.put(
      `${server}/user/forgetpassword`,
      {
        otp,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const fetchChart1Data = () => async (dispatch) => {
  try {
    dispatch({
      type: "fetchChart1DataRequest",
    });

    const { data } = await axios.get(
      `${server}/order/Orders-per-Product-Category`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "fetchChart1DataSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "fetchChart1DataFail",
      payload: error.response.data.message,
    });
  }
};
export const fetchChart2Data = () => async (dispatch) => {
  try {
    dispatch({
      type: "fetchChart2DataRequest",
    });

    const { data } = await axios.get(`${server}/order/Orders-per-week`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "fetchChart2DataSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "fetchChart2DataFail",
      payload: error.response.data.message,
    });
  }
};
export const fetchChart3Data = () => async (dispatch) => {
  try {
    dispatch({
      type: "fetchChart3DataRequest",
    });

    const { data } = await axios.get(`${server}/order/Orders-per-month`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "fetchChart3DataSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "fetchChart3DataFail",
      payload: error.response.data.message,
    });
  }
};
