import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { commentReducer } from "./reducers/commentReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    product: productReducer,
    cart: cartReducer,
    comment: commentReducer,
    wishlist: wishlistReducer
  },
});

export const server = "https://mbackend-p19q.onrender.com/api/v1"