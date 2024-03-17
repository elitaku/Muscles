import axios from "axios"
import { server } from "../store"

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