import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

 export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllCommentsRequest", (state) => {
      state.loading = true;
      state.error = null; // Clearing any previous errors
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
    })
    .addCase("addCommentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addCommentFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteCommentRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteCommentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCommentFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

});

export default commentReducer;
