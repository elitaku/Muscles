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
import { fetchMessages } from "../redux/actions/chatActions";

const UserChat = ({ item }) => {
  const { messages } = useSelector((state) => state.chat)
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState(null)
  useEffect(() => {
    fetchMessages();
  }, []);

  const getLastMessage = (item) => {
    const userMessages = messages.filter(
      (message) => {
        
        return message.messageType === "text" && (message.senderId._id === item._id || message.recepientId === item._id)
      }
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  
  useEffect(()=>{
    const message = getLastMessage(item);
    setLastMessage(message);
    
  }, [messages,item])
  useEffect(()=>{
    if (lastMessage){
      console.log(lastMessage)
    }
  },[lastMessage])
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("chatmessagescreen", {
          recepientId: item._id,
        })
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
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )}
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
        </Text>
      </View>
    </Pressable>
    
  );
};

export default UserChat;

const styles = StyleSheet.create({});
