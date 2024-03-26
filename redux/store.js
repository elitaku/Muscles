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
//Deployed server
// export const server = "https://mbackend-p19q.onrender.com/api/v1"

//Home IP
// export const server = "http://192.168.5.234:5000/api/v1"

//Kapehan IP
// export const server = "http://192.168.0.192:5000/api/v1"

//Bahay ni wanel IP
// export const server = "http://192.168.100.126:5000/api/v1"

//Hotspot ko
//export const server = "http://192.168.124.139:5000/api/v1"

//bahay ni ej IP
export const server = "http://192.168.100.191:5000/api/v1"
