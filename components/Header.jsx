import { TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { FontAwesome } from 'react-native-vector-icons';
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart = false, emptyWishlist = false }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const emptyCartHandler = () => {
    dispatch({
      type: "clearCart",
    });
  };

  const emptyWishlistHandler = () => {
    dispatch({
      type: "clearWishlist",
    });
  };

  const handleCartPress = () => {
    if (emptyCart) {
      emptyCartHandler();
    } else {
      navigate.navigate("cart");
    }
  };

  const handleWishlistPress = () => {
    if (emptyWishlist) {
      emptyWishlistHandler();
    } else {
      navigate.navigate("wishlist");
    }
  };
  

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            zIndex: 10,
          }}
          onPress={() => navigate.goBack()}
        >
          <Avatar.Icon
            style={{
              backgroundColor: colors.color4,
            }}
            icon={"arrow-left"}
            color={
              route.name === "productdetails" ? colors.color2 : colors.color3
            }
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 40,
          zIndex: 10,
        }}
        onPress={handleCartPress}
      >
        <Avatar.Icon
          style={{
            backgroundColor: colors.color4,
          }}
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productdetails" ? colors.color2 : colors.color3
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: emptyWishlist ? 80 : 95,
          top: 60,
          zIndex: 10,
        }}
        onPress={handleWishlistPress}
      >
        {emptyWishlist ? (
          <FontAwesome
            name="trash"
            size={24}
            color={colors.color3}
            style={{ position: "absolute", right: 0, top: 0 }}
          />
        ) : (
          <FontAwesome
            name="heart"
            size={24}
            color={colors.color3}
            style={{ position: "absolute", right: 0, top: 0 }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default Header;
