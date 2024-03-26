import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const UserList = ({
  id,
  name,
  email,
  address,
  city,
  country,
  deleteHandler,
  loading,
  admin = false,
  i = 0,
}) => {

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        }}
      >
        ID - #{id}
      </Text>

      <TextBox title={"Name"} value={name} i={i} />
      <TextBox title={"Email"} value={email} i={i} />
      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"City"} value={city} i={i} />
      <TextBox title={"Country"} value={country} i={i} />

      {admin && (
        <Button
          icon={"delete"}
          mode={"contained"}
          textColor={i % 2 === 0 ? colors.color2 : colors.color3}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          onPress={() => deleteHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Delete
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? "₹" : ""}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default UserList;
