import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/actions/otherActions";

const Comment = ({ route }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(""); // Initialize user state
  const [product, setProduct] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    if (route && route.params) {
      setUser(route.params.user); // Update user state
      setProduct(route.params.product);
      setNewCommentText(route.params.newCommentText);
    }
  }, [route]);

  const handleAddComment = () => {
    const myForm = new FormData();
    myForm.append("text", newCommentText);
    myForm.append("user", user);
    myForm.append("product", product);

    dispatch(addComment(myForm));
  };

  console.log(newCommentText);
  console.log(user);
  console.log(product);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newCommentText}
          onChangeText={(text) => setNewCommentText(text)}
        />
        <Button title="Add Comment" onPress={handleAddComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default Comment;
