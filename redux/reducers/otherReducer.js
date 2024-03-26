import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  chartData: [],
  chartData2: [],
  chartData3: [],
  users: [],
  user: {},
  loading: false,
  error: null,
  category: {},
};

export const otherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("deleteUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserSuccess", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserFail", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updatePicRequest", (state) => {
      state.loading = true;
    })
    .addCase("placeOrderRequest", (state) => {
      state.loading = true;
    })
    .addCase("processOrderRequest", (state) => {
      state.loading = true;
    })
    .addCase("addProductRequest", (state) => {
      state.loading = true;
    })

    .addCase("updateProductRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProductImageRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteProductImageRequest", (state) => {
      state.loading = true;
    })
    //Category==========================================================================
    //Add category
    .addCase("addCategoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("addCategorySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addCategoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Delete category
    .addCase("deleteCategoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteCategorySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCategoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update Category
    .addCase("updateCategoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateCategorySuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateCategoryFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Update Category Images
    .addCase("updateCategoryImageRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateCategoryImageSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateCategoryImageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Delete Category Images
    .addCase("deleteCategoryImageRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteCategoryImageSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCategoryImageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Get Category
    .addCase("getCategoryDetailsRequest", (state) => {
      state.loading = true;
    })
    .addCase("getCategoryDetailsSuccess", (state, action) => {
      state.loading = false;
      state.category = action.payload;
    })
    .addCase("getCategoryDetailsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    //==========================================================================
    //Comment===============================================
    // .addCase("addCommentRequest", (state) => {
    //   state.loading = true;
    // })
    // .addCase("addCommentSuccess", (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // })
    // .addCase("addCommentFail", (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    //Comment=============================================================
    .addCase("deleteProductRequest", (state) => {
      state.loading = true;
    })
    .addCase("forgetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("resetPasswordRequest", (state) => {
      state.loading = true;
    })

    .addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updatePicSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("placeOrderSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("processOrderSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addProductSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })

    .addCase("updateProductSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProductImageSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductImageSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("forgetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })

    .addCase("updatePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updatePicFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("placeOrderFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("processOrderFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("addProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("updateProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateProductImageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteProductImageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("forgetPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("resetPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchChart1DataRequest", (state) => {
      state.loading = true;
    })
    .addCase("fetchChart1DataSuccess", (state, action) => {
      state.loading = false;
      state.chartData = action.payload;
    })
    .addCase("fetchChart1DataFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchChart2DataRequest", (state) => {
      state.loading = true;
    })
    .addCase("fetchChart2DataSuccess", (state, action) => {
      state.loading = false;
      state.chartData2 = action.payload;
    })
    .addCase("fetchChart2DataFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchChart3DataRequest", (state) => {
      state.loading = true;
    })
    .addCase("fetchChart3DataSuccess", (state, action) => {
      state.loading = false;
      state.chartData3 = action.payload;
    })
    .addCase("fetchChart3DataFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearError", (state) => {
    state.error = null;
  });

  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});
