import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

interface RectangleProps {
    children?: React.ReactNode;
    style?: ViewStyle;
}

const Rectangle: React.FC<RectangleProps> = ({ children, style }) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

export default Rectangle;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "green",
    },
});
