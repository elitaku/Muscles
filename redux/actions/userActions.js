import { server } from "../store"
import axios from "axios"

export const register = (formData) => async (dispatch) => {
    
    try {
        dispatch({
            type: "registerRequest",
        })

        // Axios request

        const { data } = await axios.post(`${server}/user/new`, 

        formData
        ,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })

        dispatch({
            type: "registerSuccess",
            payload: data.message
        })

    } catch (error) {
        
        dispatch({
            type: "registerFail",
            payload: error.response.data.message
        })
    }

}

export const login = (email, password) => async (dispatch) => {
    
    try {
        dispatch({
            type: "loginRequest",
        })

        // Axios request

        const { data } = await axios.post(`${server}/user/login`, {
            email,
            password
        },{
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })

        dispatch({
            type: "loginSuccess",
            payload: data.message
        })

    } catch (error) {
        
        dispatch({
            type: "loginFail",
            payload: error.response.data.message
        })
    }

}

export const loadUser = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "loadUserRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/user/me`,
        
        {
            wuthCredentials: true
        })

        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })

    } catch (error) {
        
        dispatch({
            type: "loadUserFail",
            payload: error.response.data.message
        })
    }

}

export const logout = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "logoutRequest",
        })

        // Axios request

        const { data } = await axios.get(`${server}/user/logout`,
        
        {
            wuthCredentials: true
        })

        dispatch({
            type: "logoutSuccess",
            payload: data.message
        })

    } catch (error) {
        
        dispatch({
            type: "logoutFail",
            payload: error.response.data.message
        })
    }

}