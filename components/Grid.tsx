import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
interface GridProps {
    width: number;
    height: number;
    color?: string;
    onTouch: (color: string) => void;
}

// Custom Grid component representing a small rectangle
const Grid: React.FC<GridProps> = ({ width, height, color, onTouch }) => {
    const handleTouch = () => {
        onTouch(color || "");
    };

    return (
        <Pressable onPressIn={handleTouch}>
            <View style={{ width, height, backgroundColor: color }} />
        </Pressable>
    );
};

export default Grid;

const styles = StyleSheet.create({});
