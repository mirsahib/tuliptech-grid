import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

interface RectangleProps {
    children?: React.ReactNode;
    style?: ViewStyle;
}

const Rectangle: React.FC<RectangleProps> = ({ children, style }) => {
    return (
        <View
            style={[
                {
                    borderWidth: 1,
                    borderColor: "black",
                    flexDirection: "row",
                    flexWrap: "wrap",
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

export default Rectangle;

const styles = StyleSheet.create({});
