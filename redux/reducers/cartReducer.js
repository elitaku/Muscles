import { createReducer } from "@reduxjs/toolkit"

export const cartReducer = createReducer({
    cartItems: []
}, (builder) => {

    builder
        .addCase("addToCart", (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.find(i => i.product === item.product)

            if (itemExists) {
                state.cartItems = state.cartItems.filter((i) => i.product === itemExists.product ? item : i)
            } else {
                state.cartItems.push(item)
            }
        })
        .addCase("removeFromCart", (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((i) => i.product !== id)
        })
        .addCase("clearCart", (state) => {
            state.cartItems = []
        })
})