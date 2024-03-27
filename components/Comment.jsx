import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';
import { addComment, getAllComments, getProductRatings } from "../redux/actions/commentActions";

const Comment = () => {
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

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

  const handleAddComment = () => {
    if (!text) {
      showToast('error', 'Please enter a comment.');
      setIsLoading(false); 
      return;
    }

    setIsLoading(true);

    dispatch(addComment(text, user.user._id, product.product._id, rating))
      .then((response) => {
        setNewCommentText("");
        setRating(0);
        showToast('success', 'Comment added successfully');
        dispatch(getAllComments(product.product._id));
      dispatch(getProductRatings(product.product._id));
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        showToast('error', 'Purchase required for comments');
        if (error.response) {
          console.error("Server response data:", error.response.data);
          showToast('error', error.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (product.product._id) {
      dispatch(getAllComments(product.product._id));
      dispatch(getProductRatings(product.product._id));
    }
  }, [dispatch, product.product._id]);

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
          disabled={isLoading} 
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
