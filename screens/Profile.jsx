import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
    colors,
    defaultImg,
    defaultStyle,
    formHeading,
} from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../redux/actions/userActions";
import {
    useMessageAndErrorOther,
    useMessageAndErrorUser,
} from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { updatePic } from "../redux/actions/otherActions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";
const Profile = ({ navigation, route }) => {
    const { user } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : defaultImg);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    
    const loading = useMessageAndErrorUser(navigation, dispatch, "login");
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
          webClientId: CLIENT_ID_WEB,
          androidClientId: CLIENT_ID_ANDROID,
          iosClientId: CLIENT_ID_IOS,
        });
      }
    useEffect(() => {
        
        configureGoogleSignIn();
        
      });
    const logoutHandler = () => {
        if (user.signInMethod === "google") {
            signOut();
        }
        dispatch(logout());
    };
    const signOut = async () => {
        try{
            await GoogleSignin.signOut();
        }catch (error){
            console.log(error)
        }
    }
    const navigateHandler = (text) => {
        switch (text) {
            case "Admin":
                navigation.navigate("adminpanel");
                break;
            case "Orders":
                navigation.navigate("orders");
                break;
            case "Profile":
                navigation.navigate("updateprofile");
                break;
            case "Password":
                navigation.navigate("changepassword");
                break;
            case "People":
                navigation.navigate("peoplescreen");
                break;
            case "Contacts":
                navigation.navigate("contactscreen");
                break;
            case "Message":
                navigation.navigate("chatscreen");
                break;
            case "Sign Out":
                logoutHandler();
                break;

            default:
            case "Orders":
                navigation.navigate("orders");
                break;
        }
    };

    const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);
            // dispatch updatePic Here
            const myForm = new FormData();
            myForm.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split("/").pop(),
            });
            dispatch(updatePic(myForm));
        }

        dispatch(loadUser());
    }, [route.params, dispatch, isFocused]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar.url);
        }
    }, [user]);
    
    // useEffect(() => {
    //     if (route.params?.image) {
    //         setAvatar(route.params.image);
    //         // dispatch updatePic Here
    //     }

    //     dispatch(loadUser())
    // }, [route.params, dispatch, isFocused]);

    return (
        <>
            <View style={defaultStyle}>
                {/* Heading */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={formHeading}>Profile</Text>
                </View>

                {/* Loading */}
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <View style={styles.container}>
                            <Avatar.Image
                                source={{
                                    uri: avatar,
                                }}
                                size={100}
                                style={{ backgroundColor: colors.color1 }}
                            />

                            <TouchableOpacity
                                disabled={loadingPic}
                                onPress={() =>
                                    navigation.navigate("camera", { updateProfile: true })
                                }
                            >
                                <Button
                                    disabled={loadingPic}
                                    loading={loadingPic}
                                    textColor={colors.color1}
                                >
                                    Change Photo
                                </Button>
                            </TouchableOpacity>

                            <Text style={styles.name}>{user?.name}</Text>
                            <Text
                                style={{
                                    fontWeight: "300",
                                    color: colors.color2,
                                }}
                            >
                                {user?.email}
                            </Text>
                        </View>

                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    margin: 10,
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* <ButtonBox
                                    handler={navigateHandler}
                                    text={"Orders"}
                                    icon={"format-list-bulleted-square"}
                                /> */}
                                {user?.role === "admin" && (
                                    <ButtonBox
                                        handler={navigateHandler}
                                        icon={"view-dashboard"}
                                        text={"Admin"}
                                        reverse={true}
                                    />
                                )}
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Password"}
                                    icon={"pencil"}
                                />
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Profile"}
                                    icon={"pencil"}
                                />
                            </View>

                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        margin: 10,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <ButtonBox
                                        handler={navigateHandler}
                                        text={"People"}
                                        icon={"human"}
                                    />
                                    <ButtonBox
                                        handler={navigateHandler}
                                        text={"Message"}
                                        icon={"message"}
                                    />
                                    <ButtonBox
                                        handler={navigateHandler}
                                        text={"Contacts"}
                                        icon={"contacts"}
                                    />
                                </View>
                            </View>

                           
                        </View>
                    </>
                )}
            </View>

            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 7,
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        color: colors.color2,
    },
});

export default Profile;