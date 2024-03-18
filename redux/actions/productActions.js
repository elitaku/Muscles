import { server } from "../store"
import axios from "axios"

export const getAllProducts = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "getAllProductsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/product/all`,
        
        {
            wuthCredentials: true
        })

        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products
        })

    } catch (error) {
        
        dispatch({
            type: "getAllProductsFail",
            payload: error.response.data.message
        })
    }

}

export const getAdminProducts = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "getAdminProductsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/product/admin`,
        
        {
            wuthCredentials: true
        })

        dispatch({
            type: "getAdminProductsSuccess",
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: "getAdminProductsFail",
            payload: error.response.data.message
        })
    }

}

export const getProductDetails = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getProductDetailsRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/product/single/${id}`,
        
        {
            wuthCredentials: true
        })

        dispatch({
            type: "getProductDetailsSuccess",
            payload: data.product
        })

    } catch (error) {
        
        dispatch({
            type: "getProductDetailsFail",
            payload: error.response.data.message
        })
    }

}