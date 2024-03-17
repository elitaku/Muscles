import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
    builder.addCase("loginRequest", (state) => {
        state.loading = true;
    });

    builder.addCase("loginSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload;
    });

    builder.addCase("loginFail", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    });

    builder.addCase("clearError", (state) => {
        state.error = null;
    });
    
    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
})