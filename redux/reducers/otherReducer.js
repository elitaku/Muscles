import { createReducer } from "@reduxjs/toolkit"

export const otherReducer = createReducer({}, (builder) => {
    builder
        .addCase("updatePasswordRequest", (state) => {
            state.loading = true
        })
        .addCase("updateProfileRequest", (state) => {
            state.loading = true
        })
        .addCase("updatePicRequest", (state) => {
            state.loading = true
        })
        .addCase("placeOrderRequest", (state) => {
            state.loading = true
        })

        .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("updatePicSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })
        .addCase("placeOrderSuccess", (state, action) => {
            state.loading = false
            state.message = action.payload
        })

        .addCase("updatePasswordFail", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("updateProfileFail", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("updatePicFail", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase("placeOrderFail", (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    
    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
})