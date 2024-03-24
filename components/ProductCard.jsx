import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { FontAwesome } from 'react-native-vector-icons';

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCardHandler,
  addToWishlistHandler,
  i,
  navigate,
}) => {
  const isOutOfStock = stock === 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate.navigate("productdetails", { id })}
    >
      <View
        style={{
          elevation: 15,
          width: 250,
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          borderRadius: 20,
          height: 400,
          backgroundColor: i % 2 === 0 ? colors.color1 : colors.color2,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "contain",
            position: "absolute",
            left: 50,
            top: 105,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 25,
              fontWeight: "300",
              width: "60%",
            }}
          >
            {name}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            ₹{price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
            borderRadius: 0,
            paddingVertical: 5,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: "100%",
          }}
        >
          <Button
            onPress={() => addToCardHandler(id, name, price, image, stock)}
            textColor={i % 2 === 0 ? colors.color1 : colors.color2}
            style={{ flex: 8 }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
          </Button>
          <TouchableOpacity
            onPress={() => addToWishlistHandler(id, name, price, image, stock)}
            style={{ flex: 2, padding: 10 }}
          >
            <FontAwesome
              name="heart"
              size={24}
              color={colors.color1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
