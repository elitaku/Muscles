import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer"
import { otherReducer } from "./reducers/otherReducer"
import { productReducer } from "./reducers/productReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        other: otherReducer,
        product: productReducer
    },
})

export const server = "https://mooskles-server.onrender.com/api/v1"