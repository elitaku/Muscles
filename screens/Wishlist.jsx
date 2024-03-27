import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import WishlistItem from "../components/WishlistItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const Wishlist = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const removeWishlistHandler = (id) => {
        dispatch({ type: "removeFromWishlist", payload: id });
    };

    const addToCardHandler = (id, name, price, image, stock) => {
        if (stock === 0)
        return Toast.show({
            type: "error",
            text1: "Out Of Stock",
        });
    
        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: 1,
            },
        });
    
        Toast.show({
            type: "success",
            text1: "Added To Cart",
        });
    };
    
    

    return (
        <View
        style={{
            ...defaultStyle,
            padding: 0,
        }}
        >
        {/* Header */}
        <Header back={true} emptyWishlist={true} />


        {/* Heading */}
        <Heading
            text1="Wishlist"
            containerStyle={{ paddingTop: 50, marginLeft: 35 }}
        />

        <View
            style={{
            paddingVertical: 20,
            flex: 1,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
            {wishlistItems.length > 0 ? (
                wishlistItems.map((i, index) => (
                <WishlistItem
                    navigate={navigate}
                    key={i.product}
                    id={i.product}
                    name={i.name}
                    stock={i.stock}
                    amount={i.price}
                    imgSrc={i.image}
                    index={index}
                    removeWishlistHandler={removeWishlistHandler}
                    addToCartHandler={addToCardHandler}
                />
                ))
            ) : ( 
                <Text style={{ textAlign: "center", fontSize: 18 }}>
                No Items Yet
                </Text>
            )}
            </ScrollView>
        </View>
        </View>
    );
};

export default Wishlist;