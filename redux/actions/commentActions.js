import { server } from "../store"; 
import axios from "axios"

// Action to fetch all comments
export const getAllComments = (id) => async (dispatch) => {
    try {
        // Dispatching action to indicate the start of the request
        dispatch({
            type: "getAllCommentsRequest",
        });

        // Making an Axios GET request to fetch all comments
        const { data } = await axios.get(`${server}/comment/all/${id}`, {
            withCredentials: true, // Ensuring credentials are sent with the request
        });

        // Dispatching action with fetched comments upon success
        dispatch({
            type: "getAllCommentsSuccess",
            payload: data.comments,
        });
    } catch (error) {
        // Dispatching action with error message upon failure
        dispatch({
            type: "getAllCommentsFail",
            payload: error.response.data.message,
        });
    }
};

