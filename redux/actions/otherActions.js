import axios from "axios"
import { server } from "../store"

export const updatePic = (formData) => async (dispatch) => {
    
    try {
        dispatch({
            type: "updatePicRequest",
        })

        // Axios request

        const { data } = await axios.put(`${server}/user/updatepic`, 

        formData
        ,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })

        dispatch({
            type: "updatePicSuccess",
            payload: data.message
        })

    } catch (error) {
        
        dispatch({
            type: "updatePicFail",
            payload: error.response.data.message
        })
    }

}

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    
    try {
        dispatch({
            type: "updatePasswordRequest"
        })
        
        const { data } = await axios.put(`${server}/user/changepassword`, {
            oldPassword,
            newPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "updatePasswordFail",
            payload: error.response.data.message
        })
    }
}

export const updateProfile = (
    name,
    email,
    address,
    city,
    country,
    pinCode
) => async (dispatch) => {
    
    try {
        dispatch({
            type: "updateProfileRequest"
        })
        
        const { data } = await axios.put(`${server}/user/updateprofile`, {
            name,
            email,
            address,
            city,
            country,
            pinCode
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response.data.message
        })
    }
}