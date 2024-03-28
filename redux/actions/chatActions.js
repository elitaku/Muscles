import { server } from "../store";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    // Axios request

    const { data } = await axios.get(
      `${server}/chat/users`,

      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    console.log("chat action error", error);

    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.message,
    });
  }
};

export const sendContactRequest =
  (currentUserId, selectedUserId, navigation) => async (dispatch) => {
    try {
      dispatch({
        type: "contactRequestPending",
      });

      const response = await fetch(`${server}/chat/contact-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      dispatch({
        type: "contactRequestSuccess",
      });

      navigation.navigate("profile");
    } catch (error) {
      console.log("chat action error", error);

      dispatch({
        type: "contactRequestFail",
        payload: error.response.data.message,
      });
    }
  };

export const fetchContactRequest = () => async (dispatch) => {
  try {
    dispatch({
      type: "fetchContactRequestPending",
    });

    const response = await axios.get(`${server}/chat/contact-request`);

    if (response.status === 200) {
      const contactRequestData = response.data.map((contactRequest) => ({
        _id: contactRequest._id,
        name: contactRequest.name,
        email: contactRequest.email,
        image: contactRequest.avatar.url,
      }));

      dispatch({
        type: "fetchContactRequestSuccess",
        payload: contactRequestData,
      });
    }
  } catch (error) {
    console.log("chat action error", error);

    dispatch({
      type: "fetchContactRequestFail",
      payload: error.response.data.message,
    });
  }
};

export const acceptContactRequest = (currentUserId, selectedUserId, navigation) => async (dispatch) => {
    try {
      dispatch({
        type: "contactRequestPending",
      });

      const response = await axios.post(
        `${server}/chat/contact-request/accept`,
        {
          currentUserId,
          selectedUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "contactRequestSuccess",
        payload: selectedUserId,
      });

      navigation.navigate("profile");
    } catch (error) {
      console.log("chat action error: ", error);

      dispatch({
        type: "contactRequestFail",
        payload: error.response.data.message,
      });
    }
  };

export const fetchAcceptedContacts = () => async (dispatch) => {
  try {
    dispatch({ type: "fetchAcceptedContactsRequest" });

    const response = await axios.get(`${server}/chat/accepted-contacts`);

    if (response.status === 200) {
      dispatch({
        type: "fetchAcceptedContactsSuccess",
        payload: response.data.acceptedContacts,
      });
    } else {
      throw new Error("Failed to fetch accepted contacts");
    }
  } catch (error) {
    console.log("Error fetching accepted contacts:", error);

    dispatch({
      type: "fetchAcceptedContactsFail",
      payload: error.message,
    });
  }
};

export const sendMessage =
  (message, messageType, imageUri, userId, recepientId) => async (dispatch) => {
    try {
      dispatch({
        type: "sendMessagePending",
      });

      const response = await axios.post(`${server}/chat/messages`, {
        message,
        messageType,
        imageUri,
        userId,
        recepientId,
      });

      dispatch({
        type: "sendMessageSuccess",
      });

    } catch (error) {
      console.log("error in sending the message", error);

      dispatch({
        type: "sendMessageFail",
        payload: error.message,
      });
    }
  };

export const fetchRecepientData = (recepientId) => async (dispatch) => {
  try {
    dispatch({
      type: "fetchRecepientDataPending",
    });

    const { data } = await axios.get(`${server}/chat/user/${recepientId}`);
    const recepientData = data.recepientId;

    dispatch({
      type: "fetchRecepientDataSuccess",
      payload: recepientData,
    });
  } catch (error) {
    console.log("error retrieving details", error);
    dispatch({
      type: "fetchRecepientDataFail",
      payload: error.message,
    });
  }
};
export const fetchAllMessages = (userId) => async (dispatch) => { 
  try {
    const response = await axios.get(
      `${server}/chat/getAllMessages/${userId}`
    );
    const data = await response.data.messages;

    dispatch({
      type: "fetchAllMessagesSuccess",
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching messages:", error);

    dispatch({
      type: "fetchAllMessagesFail",
      payload: error.message,
    });
  }
}
export const fetchMessages = (userId, recipientId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${server}/chat/messages/${userId}/${recipientId}`
    );
    const data = await response.data.messages;

    dispatch({
      type: "fetchMessagesSuccess",
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching messages:", error);

    dispatch({
      type: "fetchMessagesFail",
      payload: error.message,
    });
  }
};
