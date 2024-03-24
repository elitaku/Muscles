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

export const addComment = (text, userId, productId, rating) => {
    return async (dispatch) => {
      dispatch({
        type: "addCommentRequest",
      });
  
      try {
        const commentData = {
          text: text,
          userId: userId, 
          productId: productId, 
          rating: rating
        };
        const response = await axios.post(`${server}/comment/create`, commentData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch({
          type: "addCommentSuccess",
        });
        return response.data; // Return the new comment data if needed
      } catch (error) {
        dispatch({
          type: "addCommentFail",
        });
      }
    };
  };

  export const deleteComment = (commentId) => {
    return async (dispatch) => {
      dispatch({
        type: "deleteCommentRequest",
      });
  
      try {
        const response = await axios.delete(`${server}/comment/${commentId}`, {
          withCredentials: true,
        });
        dispatch({
          type: "deleteCommentSuccess",
        });
        return response.data; // Optionally return data if needed
      } catch (error) {
        dispatch({
          type: "deleteCommentFail",
        });
      }
    };
  };
  
