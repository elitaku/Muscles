import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, colors } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
/* import { Toast } from "react-native-paper"; */
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";

const categories = [
  { category: "Nice", _id: "whfqwhv" },
  { category: "Nice2", _id: "whfqwhvee" },
  { category: "Nice3", _id: "whfqwhvseg" },
  { category: "Nice4", _id: "whfqwqwhvseg" },
  { category: "Nice5", _id: "whfqwhqwdvseg" },
  { category: "Nice6", _id: "whfgtqwhv" },
  { category: "Nice7", _id: "whfqwhthvee" },
  { category: "Nice8", _id: "whfqwhhrvseg" },
  { category: "Nice9", _id: "whfqwqhrthtwhvseg" },
  { category: "Nice10", _id: "whfqwhqwhtrdvseg" },
];

// export const products = [
//   {
//     price: 123312,
//     stock: 23,
//     name: "Sample",
//     _id: "efbhwuebef",
//     category: "Harry Potter",
//     images: [
//       {
//         url: "https://pngimg.com/d/dumbbell_PNG102651.png",
//       },
//     ],
//   },

//   {
//     price: 123312,
//     stock: 23,
//     name: "Sample2",
//     _id: "efbhwewweuebef",
//     category: "Laptop",
//     images: [
//       {
//         url: "https://setgis.net/images/spongebob_meme.png",
//       },
//     ],
//   },
//   {
//     price: 36546,
//     stock: 23,
//     name: "Sample",
//     _id: "efbhwfsfduebef",
//     category: "whfqgfdfgwhv",
//     images: [
//       {
//         url: "https://th.bing.com/th/id/R.a59546bf83f141e18a3181d761d5ca02?rik=TdNF5TC55Xk0JA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fshrek%2fshrek_PNG16.png&ehk=g%2fTbGNEQI%2fiwTHqNIA5k2AauC9JH23hGvuqAYQKxdzM%3d&risl=&pid=ImgRaw&r=0",
//       },
//     ],
//   },

//   {
//     price: 67567,
//     stock: 23,
//     name: "Sample2",
//     _id: "retw4t45y",
//     category: "whfqdfgdfwhvee",
//     images: [
//       {
//         url: "https://animedork.com/wp-content/uploads/2022/11/Mash-Burnedead.png",
//       },
//     ],
//   },
// ];

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigation();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product)

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        <Header />

        {/* Heading Row*/}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <Heading text1="Our" text2="Products" />

          {/* Search bar */}

          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color={"gray"}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;
