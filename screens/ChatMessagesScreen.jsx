import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../styles/styles";
import React, { useState, useContext, useLayoutEffect, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages, fetchMessages, fetchRecepientData, sendMessage } from "../redux/actions/chatActions";

const ChatMessagesScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { recepientData } = useSelector((state) => state.chat)
  const { messages, loading } = useSelector((state) => state.chat)
  const userId = user._id

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentMessages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom()
  },[messages]);

  const scrollToBottom = () => {
      if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({animated:false})
      }
  }

  const handleContentSizeChange = () => {
      scrollToBottom();
  }

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  useEffect(() => {
    dispatch({type: "resetMessages"})
    dispatch(fetchRecepientData(recepientId));
    dispatch(fetchMessages(userId, recepientId));
  }, [dispatch, recepientId]);

  const handleSend = (messageType, imageUri) => {
    dispatch(sendMessage(message, messageType, imageUri, userId, recepientId));
    setMessage("");
    setSelectedImage("");
    dispatch(fetchRecepientData(recepientId));
    dispatch(fetchMessages(userId, recepientId));
    dispatch(fetchAllMessages(userId))
  };

  //   try {
  //     const response = await fetch("http://192.168.100.169:8000/deleteMessages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ messages: messageIds }),
  //     });

  //     if (response.ok) {
  //       setSelectedMessages((prevSelectedMessages) =>
  //       prevSelectedMessages.filter((id) => !messageIds.includes(id))
  //     );

  //       fetchMessages();
  //     } else {
  //       console.log("error deleting messages", response.status);
  //     }
  //   } catch (error) {
  //     console.log("error deleting messages", error);
  //   }
  // };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };

  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0", marginTop: 100 }}>
        <ScrollView 
          ref={scrollViewRef} 
          contentContainerStyle={{flexGrow:1}} 
          onContentSizeChange={handleContentSizeChange}

          >
          {messages.map((item, index) => {
            if (item.messageType === "text") {
              const isSelected = selectedMessages.includes(item._id);
              return (
                <Pressable
                  onLongPress={() => handleSelectMessage(item)}
                  key={index}
                  style={[
                    item?.senderId?._id === userId
                      ? {
                          alignSelf: "flex-end",
                          backgroundColor: "#DCF8C6",
                          padding: 8,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 10,
                        }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "white",
                          padding: 8,
                          margin: 10,
                          borderRadius: 7,
                          maxWidth: "60%",
                        },

                    isSelected && { backgroundColor: "#F0FFFF" },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: isSelected ? "right" : "left",
                    }}
                  >
                    {item?.message}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      color: "gray",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item.timeStamp)}
                  </Text>
                </Pressable>
              );
            }

            if (item.messageType === "image") {
              const baseUrl =
                "/Users/jonas/Documents/Programming Language - Design and Implementation/nativechat/build/chat-app/api/files";
              const imageUrl = item.imageUrl;
              const filename = imageUrl.split("/").pop();
              const source = { uri: baseUrl + filename };
              return (
                <Pressable
                  key={index}
                  style={[
                    item?.senderId?._id === userId
                      ? {
                          alignSelf: "flex-end",
                          backgroundColor: "#DCF8C6",
                          padding: 8,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 10,
                        }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "white",
                          padding: 8,
                          margin: 10,
                          borderRadius: 7,
                          maxWidth: "60%",
                        },
                  ]}
                >
                  <View>
                    <Image
                      source={source}
                      style={{ width: 200, height: 200, borderRadius: 7 }}
                    />
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 9,
                        position: "absolute",
                        right: 10,
                        bottom: 7,
                        color: "white",
                        marginTop: 5,
                      }}
                    >
                      {formatTime(item?.timeStamp)}
                    </Text>
                  </View>
                </Pressable>
              );
            }
          })}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            marginBottom: showEmojiSelector ? 0 : 0,
          }}
        >
          <Entypo
            onPress={handleEmojiPress}
            style={{ marginRight: 5}}
            name="emoji-happy"
            size={24}
            color="gray"
          />

          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#dddddd",
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Type Your message..."
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginHorizontal: 8,
            }}
          >
            <Entypo 
              // onPress={pickImage} 
              name="camera" 
              size={24} 
              color="gray" />

            <Feather name="mic" size={24} color="gray" />
          </View>

          <Pressable
            onPress={() => handleSend("text")}
            style={{
              backgroundColor: "#007bff",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
          </Pressable>
        </View>

        {showEmojiSelector && (
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setMessage((prevMessage) => prevMessage + emoji);
            }}
            style={{ height: 250, marginBottom: 140 }}
          />
        )}
      </KeyboardAvoidingView>
      {/* <Footer /> */}
    </>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
