import { createReducer } from "@reduxjs/toolkit";

export const wishlistReducer = createReducer(
    {
        wishlistItems: [],
    },
    (builder) => {
        builder
        .addCase("addToWishlist", (state, action) => {
            const item = action.payload;
            const isExist = state.wishlistItems.find((i) => i.product === item.product);
            if (!isExist) {
                state.wishlistItems.push(item);
            }
        })
        .addCase("removeFromWishlist", (state, action) => {
            const id = action.payload;
            state.wishlistItems = state.wishlistItems.filter((i) => i.product !== id);
        })
        .addCase("clearWishlist", (state) => {
            state.wishlistItems = [];
        });
    }
);