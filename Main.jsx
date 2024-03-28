import React, { useEffect } from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
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

import PeopleScreen from "./screens/PeopleScreen";
import ContactsScreen from "./screens/ContactsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";

import Comment from "./screens/Comment";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./redux/actions/userActions";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import CategoryImages from "./screens/Admin/CategoryImages";
import Wishlist from "./screens/Wishlist";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
  formStyles as styles,
} from "./styles/styles";
import { useMessageAndErrorUser } from "./utils/hooks";
import UserLists from "./screens/Admin/UserLists";
const CustomDrawerContent = (props) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { navigation } = props;
  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
  const loadingSignOut = useMessageAndErrorUser(navigation, dispatch, "login");
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID_WEB,
      androidClientId: CLIENT_ID_ANDROID,
      iosClientId: CLIENT_ID_IOS,
    });
  };
  useEffect(() => {
    configureGoogleSignIn();
  });
  const navigateTohome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  };
  const logoutHandler = () => {
    if (user.signInMethod === "google") {
      signOut();
    }
    dispatch(logout());
    dispatch({type: "resetContacts"})
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", padding: 20 }}>
        {!loading && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (isAuthenticated) navigation.navigate("profile");
              else navigation.navigate("login");
            }}
          >
            <Avatar.Image
              source={{ uri: user?.avatar ? user.avatar.url : defaultImg }}
              size={100}
              style={{ backgroundColor: colors.color1 }}
            />
          </TouchableOpacity>
        )}

        {!loading && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (isAuthenticated) navigation.navigate("profile");
              else navigation.navigate("login");
            }}
          >
            <Text style={{ marginTop: 20 }}>{user?.name || "Login"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <DrawerItem label="Home" onPress={navigateTohome} />
      {user ? (
        <>
          <DrawerItem
            label="Orders"
            onPress={() => navigation.navigate("orders")}
          />
        </>
      ) : null}

      {/* <DrawerItemList {...props} /> */}
      {user && !loadingSignOut && (
        <DrawerItem label="Sign Out" onPress={logoutHandler} />
      )}
    </DrawerContentScrollView>
  );
};

const HomeStack = () => {
  return (
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

        <Stack.Screen name="peoplescreen" component={PeopleScreen} />
        <Stack.Screen name="contactscreen" component={ContactsScreen} />
        <Stack.Screen name="chatscreen" component={ChatsScreen} />
        <Stack.Screen name="chatmessagescreen" component={ChatMessagesScreen} />

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
        <Stack.Screen name="allusers" component={UserLists} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const Main = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser(user));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
      </Drawer.Navigator>

      <Toast position="top" bottomOffset={20} />
    </NavigationContainer>
  );
};

export default Main;
