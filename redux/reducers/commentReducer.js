import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
  message: null, // Adding message field for success message
  averageRating: null,
};

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllCommentsRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("getAllCommentsSuccess", (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
    .addCase("getAllCommentsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("addCommentRequest", (state) => {
      state.loading = true;
      state.error = null; // Clearing any previous errors
    })
    .addCase("addCommentSuccess", (state) => {
      state.loading = false;
      state.message = "Comment added successfully"; // Setting success message
    })
    .addCase("addCommentFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteCommentRequest", (state) => {
      state.loading = true;
      state.error = null; // Clearing any previous errors
    })
    .addCase("deleteCommentSuccess", (state) => {
      state.loading = false;
      state.message = "Comment deleted successfully"; // Setting success message
    })
    .addCase("deleteCommentFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("getProductRatingsRequest", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("getProductRatingsSuccess", (state, action) => {
      state.loading = false;
      state.averageRating = action.payload;
    })
    .addCase("getProductRatingsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default commentReducer;
