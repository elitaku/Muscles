import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating"; // Import the star rating component
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/actions/otherActions";
import enforcerImage from "../images/enforcer_stop.jpg";
import { inputOptions } from "../styles/styles";

const Comment = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [starCount, setStarCount] = useState(0); // State for star rating
  const dispatch = useDispatch();

  // Assuming you have user and product data available from redux state
  const { user } = useSelector((state) => state.user); // Update with actual selector
  const { product } = useSelector((state) => state.product); // Update with actual selector

  const disableBtnCondition = !commentText;

  const handlePostComment = () => {
    const formData = new FormData();
    formData.append("userId", user._id); // Assuming user ID is available
    formData.append("productId", product._id); // Assuming product ID is available
    formData.append("text", commentText);
    formData.append("rating", starCount); // Append the star rating to the form data

    dispatch(addComment(formData));

    // Show the toast
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false); // Hide the toast after 3 seconds
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* Product Image */}
      {/* <Image source={enforcerImage} style={styles.image} /> */}

      {/* Product Details */}
      <View style={styles.productDetails}>
        {/* <Text style={styles.productName}>{productName}</Text> */}
        <Text style={styles.productId}>Product ID: {product.id}</Text>
      </View>

      {/* Star Rating */}
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starCount}
        selectedStar={(rating) => setStarCount(rating)}
        fullStarColor={"gold"}
        emptyStarColor={"gold"}
      />

      {/* Comment Input and Button Container */}
      <View style={styles.commentInputContainer}>
        <TextInput
          {...inputOptions}
          placeholder="Add your comment..."
          multiline={true}
          value={commentText}
          onChangeText={setCommentText}
          style={styles.commentInput} // Added style
        />
        <TouchableOpacity
          style={[styles.postButton, { marginLeft: 10 }]} // Added marginLeft to separate button from input
          onPress={handlePostComment}
          disabled={disableBtnCondition}
        >
          <Text style={styles.postButtonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Commented Successfully</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  productDetails: {
    alignItems: "center",
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productId: {
    fontSize: 16,
    color: "grey",
  },
  commentInputContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center items vertically
    width: "80%",
    marginBottom: 10,
  },
  commentInput: {
    flex: 1, // Take remaining space
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  toastText: {
    color: "white",
  },
});

export default Comment;
