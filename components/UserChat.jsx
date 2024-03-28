import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../styles/styles";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../redux/actions/userActions";

const UserChat = ({ item, lastMessage, newMessages, setNewMessages }) => {
  
  const navigation = useNavigation();
  
  // const [hasBeenPressed, setHasBeenPressed] = useState(false)
  // const [lastSeenMessage, setLastSeenMessage] = useState({})
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, []);
 
  
  // useEffect(() => {
  //   const currentLastMessage = lastMessage[item._id]?.message;
  //   const currentLastSeenMessage = lastSeenMessage[item._id]?.message;

  //   if (currentLastMessage !== currentLastSeenMessage) {
  //     setHasBeenPressed(false);

  //     // Update lastSeenMessage for the current chatbox only
  //     setLastSeenMessage(prevState => ({
  //       ...prevState,
  //       [item._id]: lastMessage[item._id],
  //     }));
  //   }
  // }, [lastMessage]);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <Pressable
      onPress={() =>{
        navigation.navigate("chatmessagescreen", {
          recepientId: item._id,
        })
        // setHasBeenPressed(true);
        setNewMessages((prevNewMessages) => ({
          ...prevNewMessages,
          [item._id]: false,
        }, ()=>{
          console.log(newMessages)
        }))
      }
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item.avatar ? item.avatar.url : defaultImg }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: newMessages[item._id] ? "bold" : "500" }}>{item?.name}</Text>
        {lastMessage[item._id] && (
          <Text
            style={{
              marginTop: 3,
              color:newMessages[item._id] ? "black" : "gray" ,
              fontWeight:newMessages[item._id] ? "bold" :"500",

            }}
          >
            {lastMessage[item._id]?.message}
          </Text>
        )}
      </View>

      <View>
        <Text
          style={{
            fontSize: 11,
            fontWeight:newMessages[item._id] ? "bold" :"400",
            color: newMessages[item._id] ? "black" :"#585858",
          }}
        >
          {lastMessage[item._id] && formatTime(lastMessage[item._id]?.timeStamp)}
        </Text>
      </View>
    </Pressable>

  );
};

export default UserChat;

const styles = StyleSheet.create({});
