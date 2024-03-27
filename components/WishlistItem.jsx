import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { iconOptions } from "../screens/ProductDetails";

const WishlistItem = ({
    name,
    amount,
    stock,
    index,
    imgSrc,
    price,
    removeWishlistHandler,
    addToCartHandler,
    id,
    navigate,
    }) => {
    return (
        <View
        style={{
            flexDirection: "row",
            height: 100,
            marginVertical: 20,
        }}
        >
        <View
            style={{
            width: "40%",
            backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            }}
        >
            <Image
            source={{
                uri: imgSrc,
            }}
            style={styles.img}
            />
        </View>
        <View
            style={{
            width: "40%",
            paddingHorizontal: 25,
            }}
        >
            <Text
            numberOfLines={1}
            style={{
                fontSize: 17,
            }}
            onPress={() => navigate.navigate("productdetails", { id })}
            >
            {name}
            </Text>

            <Text
            numberOfLines={1}
            style={{
                fontSize: 17,
                fontWeight: "900",
            }}
            >
            ₹{amount}
            </Text>

            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCartHandler(id, name, price, imgSrc, stock)}
            >
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            
        </View>

        <View style={styles.iconContainer}>
            <TouchableOpacity
                onPress={() => removeWishlistHandler(id, name, amount, imgSrc, stock)}
                >
                <Avatar.Icon icon={"delete"} size={40}
                style={{
                    borderRadius: 5,
                    backgroundColor: colors.color5,
                    height: 50,
                    width: 50,
                }} />
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: "100%",
        resizeMode: "contain",
        top: "-20%",
        left: "10%",
    },
    iconContainer: {
        alignItems: "center",
        width: "20%",
        height: 50,
        justifyContent: "space-between",
        alignSelf: "center",
    }
});

export default WishlistItem;