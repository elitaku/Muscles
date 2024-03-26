import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
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

const ChatsScreen = () => {
  
  const { contacts } = useSelector((state) => state.chat)
  
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    
    const timeOutId = setTimeout(() => {
      dispatch(fetchAcceptedContacts());
    }, 200)
    return () => {
      clearTimeout(timeOutId)
    }
    
  }, [dispatch, isFocused]);

  
  return (
    
    <>
    <View style={defaultStyle}>
      <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Messages</Text>
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
            {contacts.map((item,index) => (
                <UserChat key={index} item={item}/>
            ))}
        </Pressable>
      </ScrollView>
    </View>
    <Footer />
  </>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
