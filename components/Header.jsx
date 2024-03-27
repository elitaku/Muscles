import { TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
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
            top: 10,
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
          top: 10,
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
          right: emptyWishlist ? 70 : 70,
          top: 10,
          zIndex: 10,
        }}
        onPress={handleWishlistPress}
      >
        {emptyWishlist ? (
          <Avatar.Icon
            icon="delete-outline"
            color={colors.color3}
            style={{ backgroundColor: colors.color4 }}
          />
        ) : (
          <Avatar.Icon
            icon="heart-outline"
            color={colors.color3}
            style={{ backgroundColor: colors.color4 }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default Header;
