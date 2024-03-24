import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';
import axios from 'axios'; // Import axios
import { server } from "../redux/store"; 

const Comment = () => {
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);

  const [text, setNewCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleAddComment = async () => {
    try {
      console.log("Submitting comment...");
  
      if (!text) {
        showToast('error', 'Please enter a comment.');
        return;
      }
  
      setIsLoading(true);
  
      const commentData = {
        text: text,
        userId: user.user._id, // Assuming this is the correct user ID
        productId: product.product._id, // Assuming this is the correct product ID
        rating: rating
      };
  
      const { data } = await axios.post(`${server}/comment/create`, commentData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      console.log("Data after comment addition:", data);
  
      setNewCommentText("");
      setRating(0);
      showToast('success', 'Comment added successfully');
    } catch (error) {
      console.error("Error adding comment:", error);
      showToast('error', 'Failed to add comment');
      if (error.response) {
        console.error("Server response data:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };
console.log(user.user._id)  
console.log(product.product._id)  


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={text}
          onChangeText={setNewCommentText}
        />
        <Rating
          showRating
          startingValue={rating}
          onFinishRating={(value) => setRating(value)}
        />
        <Button
          title={"Add Comment"}
          onPress={handleAddComment}
          disabled={isLoading} // Disable the button while loading
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
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
    width: '100%'
  },
});

export default Comment;
