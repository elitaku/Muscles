import { server } from "../store"; 
import axios from "axios"

// Action to fetch all comments
export const getAllComments = (id) => async (dispatch) => {
  dispatch({ type: "getAllCommentsRequest" }); // Dispatch loading start action
  
  try {
    const response = await axios.get(`${server}/comment/all/${id}`);
    const comments = response.data;
    dispatch({ type: "getAllCommentsSuccess", payload: comments }); // Dispatch success action with fetched comments
  } catch (error) {
    dispatch({ type: "getAllCommentsFail", payload: error }); // Dispatch failure action with error message
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
  
  export const getProductRatings = (productId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${server}/comment/products/${productId}/ratings`);
        dispatch({
          type: "getProductRatingsSuccess",
          payload: response.data.averageRating,
        });
      } catch (error) {
        console.error("Error fetching product ratings:", error);
        dispatch({
          type: "getProductRatingsFail",
          payload: error.message,
        });
      }
    };
  };
