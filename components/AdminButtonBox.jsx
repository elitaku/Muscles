import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const AdminButtonBox = ({
    icon,
    text,
    handler,
    reverse = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                backgroundColor: reverse ? colors.color1 : colors.color3,
                height: 100,
                width: 140,
                borderRadius: 20,
                alignItems: "center",
                padding: 10,
            }}
            onPress={() => handler(text)}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color={colors.color2}
                style={{ backgroundColor: reverse ? colors.color1 : colors.color3 }}
                icon={icon}
            />
            <Text
                style={{
                    color: colors.color2,
                    textAlign: "center",
                    fontSize: 16,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default AdminButtonBox;