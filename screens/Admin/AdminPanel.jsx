import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import AdminButtonBox from "../../components/AdminButtonBox";
import ProductListHeading from "../../components/ProductListHeading";
import ProductListItem from "../../components/ProductListItem";
import Chart from "../../components/Chart";
import ProductSalesChart from "../../components/ProductSalesChart";
import MonthlySalesChart from "../../components/MonthlySalesChart";
import UserSalesChart from "../../components/UserSalesChart";
import {
  useAdminProducts,
  useMessageAndErrorOther,
  useChartData,
} from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { deleteProduct } from "../../redux/actions/otherActions";
import { getAdminProducts } from "../../redux/actions/productActions";

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { chartData, chartData2, chartData3, loading, error } = useChartData(
    dispatch,
    isFocused
  );
  console.log(chartData, chartData2, chartData3, loading, error);
  const { products } = useAdminProducts(dispatch, isFocused);

  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Analytics":
        navigation.navigate("analytics");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;

      default:
        navigation.navigate("allusers");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const loadingDelete = useMessageAndErrorOther(
    dispatch,
    null,
    null,
    getAdminProducts
  );

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
                marginBottom: 600,
                marginRight: 10,
              }}
            >
              <Chart inStock={inStock} outOfStock={outOfStock} />
            </View>

            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
                marginBottom: 600,
                marginRight: 10,
              }}
            >
              <ProductSalesChart data={chartData} />
            </View>

            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
                marginBottom: 600,
                marginRight: 10,
              }}
            >
              <UserSalesChart data={chartData2} />
            </View>

            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
                marginBottom: 600,
              }}
            >
              <MonthlySalesChart data={chartData3} />
            </View>
          </ScrollView> */}

          <View>
            <View
              style={{
                flexDirection: "row",
                // padding: 10,
                justifyContent: "space-evenly",
              }}
            >
              <AdminButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />

              <AdminButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <AdminButtonBox
                icon={"graph-outline"}
                text={"Analytics"}
                handler={navigationHandler}
                reverse={true}
              />
            </View>

          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-evenly",
              }}
            >
              <AdminButtonBox
                icon={"account-outline"}
                text={"All Users"}
                handler={navigationHandler}
                reverse={true}
              />

              <AdminButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {!loadingDelete &&
                products.map((item, index) => (
                  <ProductListItem
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item.category?.category}
                    imgSrc={item.images[0].url}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
