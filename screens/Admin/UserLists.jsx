import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ToastAndroid } from "react-native";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import { useIsFocused } from "@react-navigation/native";
import { Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/actions/otherActions";
import { getAllUsers } from "../../redux/actions/chatActions";
import UserList from "../../components/UserList";

const UserLists = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chat);
  const [showMessage, setShowMessage] = useState(false);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    setShowMessage(true);
    
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllUsers());
    }, 200);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (showMessage) {
      // Show message using ToastAndroid
      ToastAndroid.show("User deleted completely", ToastAndroid.SHORT);
      setShowMessage(false);
    }
  }, [showMessage]);

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>All Users</Text>
      </View>

      <View
        style={{
          padding: 10,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.length > 0 ? (
            users.map((user, index) => (
              <UserList
                key={user._id}
                id={user._id}
                i={index}
                name={user.name}
                email={user.email}
                address={user.address}
                city={user.city}
                country={user.country}
                admin={true}
                deleteHandler={deleteHandler}
              />
            ))
          ) : (
            <Headline style={{ textAlign: "center" }}>No Users Yet</Headline>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default UserLists;
