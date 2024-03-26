import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../styles/styles";
import { sendContactRequest } from '../redux/actions/chatActions';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const People = ({ item }) => {
  const navigation = useNavigation()
  const { user } = useSelector((state) => state.user);
  const currentUserId = user._id

  const dispatch = useDispatch();

  const handleAddContact = () => {
    dispatch(sendContactRequest(currentUserId, item._id, navigation));
  };

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.avatar ? item.avatar.url : defaultImg}}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>     
      {item.contacts.includes(currentUserId) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Contacts</Text>
        </Pressable>
      ) : item.contactRequest.includes(currentUserId) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleAddContact}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Contact
          </Text>
        </Pressable>
      )}
    </Pressable>
  )
}

export default People

const styles = StyleSheet.create({})