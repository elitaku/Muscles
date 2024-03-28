import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../styles/styles";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcceptedContacts } from "../redux/actions/chatActions";
import UserChat from "../components/UserChat";
import { fetchAllMessages } from "../redux/actions/chatActions";
import { loadUser } from "../redux/actions/userActions";
const ChatsScreen = () => {

  const { loading, contacts } = useSelector((state) => state.chat)
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [lastMessage, setLastMessage] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const { allMessages } = useSelector(state => state.chat)
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    
    dispatch(loadUser())
  }, [])
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      reloadMessages(user, contacts)
    }
    return () => { isMounted = false }

  }, [user, contacts]);

  const reloadMessages = (user, contacts) => {
    if (contacts.length > 0 && user) {
      contacts.map((item) => {
        if (item) {
          dispatch(fetchAllMessages(user._id)).then(() => {
            if (allMessages.length > 0) {
              const lastMessage = getLastMessage(item, user);
              setLastMessage((prevLastMessages) => {
                // Check if there's a new message
                if (
                  lastMessage !== prevLastMessages[item._id] &&
                  lastMessage.senderId._id !== user._id && !newMessages[item._id]
                ) {
                  setNewMessages((prevNewMessages) => ({
                    ...prevNewMessages,
                    [item._id]: true,
                  }));
                } else {
                  setNewMessages((prevNewMessages) => ({
                    ...prevNewMessages,
                    [item._id]: false,
                  }));
                }

                return {
                  ...prevLastMessages,
                  [item._id]: lastMessage,
                };
              });

            }
          });
        }
      })
    }
  }
  useEffect(() => {
    dispatch(fetchAcceptedContacts());
    // const timeOutId = setTimeout(() => {
    //   dispatch(fetchAcceptedContacts());
    // }, 200)
    // return () => {
    //   clearTimeout(timeOutId)
    // }

  }, [dispatch, isFocused]);
  useEffect(() => {
    if (lastMessage) {
      console.log(lastMessage)
    }
  }, [lastMessage])
  const getLastMessage = (item, user) => {

    const userMessages = allMessages.filter(
      (message) => {
        return message.messageType === "text" && ((message.senderId._id === user._id && message.recepientId === item._id) || (message.senderId._id === item._id && message.recepientId === user._id))
      }
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };

  return (

    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Messages</Text>
        </View>
        {!loading &&
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable>
              {contacts.map((item, index) => (
                <UserChat key={index} item={item} lastMessage={lastMessage} newMessages={newMessages} setNewMessages={setNewMessages} />
              ))}
            </Pressable>
          </ScrollView>}
      </View>

      <Footer />
    </>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
