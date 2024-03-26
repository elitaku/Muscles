import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { addCategory, deleteCategory } from "../../redux/actions/otherActions";

const Categories = ({ navigation, route, navigate }) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("category", category);
    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    // console.log("FormData:", myForm);

    dispatch(addCategory(myForm));
  };

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Categories</Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              deleteHandler={deleteHandler}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
      {/* add category form */}
      <View style={styles.container}>
        <View
          style={{
            width: 80,
            height: 80,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          <Avatar.Image
            size={80}
            style={{
              backgroundColor: colors.color1,
            }}
            source={{
              uri: image ? image : null,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("camera", { newCategory: true })}
          >
            <Avatar.Icon
              icon={"camera"}
              size={30}
              color={colors.color3}
              style={{
                backgroundColor: colors.color2,
                position: "absolute",
                bottom: 0,
                right: -5,
              }}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            margin: 20,
            padding: 6,
          }}
          loading={loading}
          disabled={!category}
          onPress={submitHandler}
        >
          Add
        </Button>
      </View>
      {/* add category form */}
    </View>
  );
};

const CategoryCard = ({ name, id, deleteHandler, navigate, navigation }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.cardText}>{name}</Text>
    <TouchableOpacity onPress={() => deleteHandler(id)}>
      <Avatar.Icon
        icon={"delete"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
    <TouchableOpacity
  onPress={() => navigation && navigation.navigate("updatecategory", { id })}
>

      <Avatar.Icon
        icon={"pen"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
  </View>
);


export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },

  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
