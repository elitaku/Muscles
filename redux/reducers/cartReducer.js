import { createReducer } from "@reduxjs/toolkit"

export const cartReducer = createReducer({
    cartItems: []
}, (builder) => {

    builder
        .addCase("addToCart", (state, action) => {

        })
        .addCase("removeFromCart", (state, action) => {
            
        })
        .addCase("clearCart", (state) => {
            state.cartItems = []
        })
})