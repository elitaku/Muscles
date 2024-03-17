import { server } from "../store"
import axios from "axios"

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
            }
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