import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
  message: null,
  contactRequests: [],
  contacts: [],
  contact: {},
  recepientData: {},
  messages: [],
  allMessages: []
};

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("contactRequestPending", (state) => {
      state.loading = true;
    })
    .addCase("fetchContactRequestPending", (state) => {
      state.loading = true;
    })
    .addCase("acceptContactRequestPending", (state, action) => {
      state.loading = true;
    })
    .addCase("fetchAcceptedContactsRequest", (state, action) => {
      state.loading = true;
    })
    .addCase("sendMessagePending", (state, action) => {
      state.loading = true;
    })
    .addCase("fetchRecepientDataPending", (state, action) => {
      state.loading = true;
    })
    .addCase("fetchMessagesRequest", (state, action) => {
      state.loading = true;
    })

    .addCase("getAllUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("contactRequestSuccess", (state) => {
      state.loading = false;
    })
    .addCase("fetchContactRequestSuccess", (state, action) => {
      state.loading = false;
      state.contactRequests = action.payload;
    })
    .addCase("acceptContactRequestSuccess", (state, action) => {
      state.loading = false;
      state.contactRequests = state.contactRequests.filter(userId => userId !== action.payload);
    })
    .addCase("fetchAcceptedContactsSuccess", (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    })
    .addCase("sendMessageSuccess", (state) => {
      state.loading = false;
    })
    .addCase("fetchRecepientDataSuccess", (state, action) => {
      state.loading = false;
      state.recepientData = action.payload;
    })
    .addCase("fetchMessagesSuccess", (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    })
    .addCase("fetchAllMessagesSuccess", (state, action) => {
      state.loading = false;
      state.allMessages = action.payload;
    })
    .addCase("getAllUsersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("contactRequestFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchContactRequestFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("acceptContactRequestFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchAcceptedContactsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("sendMessageFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchRecepientDataFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchMessagesFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("fetchAllMessagesFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    })
    .addCase("resetMessages", (state)=>{
      state.messages = []
    })
    .addCase("resetContacts", (state)=>{
      state.contacts = []
    })
});
