import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
// import Loader from "../../components/Loader";
import { useMessageAndErrorOther } from "../../utils/hooks";
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


  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    
    const timeOutId = setTimeout(() => {
      dispatch(getAllUsers());
    }, 200)
    return () => {
      clearTimeout(timeOutId)
    }

  }, [dispatch, isFocused]);

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
                // pinCode={user.pinCode}
                // avatar={user.avatar}
                // uri={user.avatar ? user.avatar.uri : null}
                admin={true}
                deleteHandler={deleteHandler}
                // loading={processUsersLoading}
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
