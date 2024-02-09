import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
interface GridProps {
    width: number;
    height: number;
    style?: ViewStyle;
    text?: string;
}

// Custom Grid component representing a small rectangle
const Grid: React.FC<GridProps> = ({ width, height, style, text }) => {
    return (
        <View
            style={[
                { width, height, borderWidth: 1, borderColor: "green" },
                style,
            ]}
        >
            <Text>{text}</Text>
        </View>
    );
};

export default Grid;

const styles = StyleSheet.create({});
