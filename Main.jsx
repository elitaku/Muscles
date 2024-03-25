import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import ConfirmOrder from "./screens/ConfirmOrder";
import Payment from "./screens/Payment";
import Login from "./screens/Login";
import Toast from "react-native-toast-message";
import ForgetPassword from "./screens/ForgetPassword";
import Verify from "./screens/Verify";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import UpdateProfile from "./screens/UpdateProfile";
import ChangePassword from "./screens/ChangePassword";
import Orders from "./screens/Orders";
import AdminPanel from "./screens/Admin/AdminPanel";
import Categories from "./screens/Admin/Categories";
import AdminOrders from "./screens/Admin/AdminOrders";
import UpdateProduct from "./screens/Admin/UpdateProduct";
import UpdateCategory from "./screens/Admin/UpdateCategory";
import NewProduct from "./screens/Admin/NewProduct";
import ProductImages from "./screens/Admin/ProductImages";
import Analytics from "./screens/Admin/Analytics";
import Camera from "./screens/Camera";
import Comment from "./screens/Comment";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import CategoryImages from "./screens/Admin/CategoryImages";
import Wishlist from "./screens/Wishlist";

const Stack = createNativeStackNavigator();

const Main = () => {

  const dispatch = useDispatch()

  const { user } = useSelector( (state) => state.user )

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="productdetails" component={ProductDetails} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="wishlist" component={Wishlist} />
          <Stack.Screen name="confirmorder" component={ConfirmOrder} />
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="updateprofile" component={UpdateProfile} />
          <Stack.Screen name="changepassword" component={ChangePassword} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name="camera" component={Camera} />
          <Stack.Screen name="comment" component={Comment} />

          {/* Password Reset Routes */}
          <Stack.Screen name="forgetpassword" component={ForgetPassword} />
          <Stack.Screen name="verify" component={Verify} />


          {/* Admin Routes */}
          <Stack.Screen name="adminpanel" component={AdminPanel} />
          <Stack.Screen name="categories" component={Categories} />
          <Stack.Screen name="adminorders" component={AdminOrders} />
          <Stack.Screen name="analytics" component={Analytics} />
          <Stack.Screen name="updateproduct" component={UpdateProduct} />
          <Stack.Screen name="updatecategory" component={UpdateCategory} />
          <Stack.Screen name="newproduct" component={NewProduct} />
          <Stack.Screen name="productimages" component={ProductImages} />
          <Stack.Screen name="categoryimages" component={CategoryImages} />
        </Stack.Group>
      </Stack.Navigator>

      <Toast position="top" bottomOffset={20} />
    </NavigationContainer>
  );
};

export default Main;
