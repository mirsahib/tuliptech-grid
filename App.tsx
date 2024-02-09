import React, { useEffect, useState } from "react";
import {
    Button,
    Pressable,
    Text,
    TextInput,
    View,
    ViewStyle,
} from "react-native";

// Props for the Rectangle component
interface RectangleProps {
    children?: React.ReactNode;
    style?: ViewStyle;
}

// Custom Rectangle component representing the main rectangle
const Rectangle: React.FC<RectangleProps> = ({ children, style }) => {
    return (
        <View
            style={[
                {
                    // borderWidth: 2,
                    // borderColor: "black",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    backgroundColor: "green",
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

// Props for the Grid component
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

// Main App component
const App: React.FC = () => {
    // Define the size of the main rectangle
    const rectangleWidth: number = 300;
    const rectangleHeight: number = 400;
    // Define the minimum cell width and height
    const minCellWidth = 10;
    const minCellHeight = 10;

    // Define the width and height of each grid cell
    const [cellWidth, setCellWidth] = useState<string>("10");
    const [cellHeight, setCellHeight] = useState<string>("10");
    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Grid state
    const [grid, setGrid] = useState<React.ReactNode[]>([]);
    // Grid selected color state
    const [selectedColor, setSelectedColor] = useState<string>("");

    // Function to generate a random color
    const getRandomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };
    // Handle grid touch
    const handleTouch = (color: string) => {
        setSelectedColor(color);
    };

    // Handle submit button press
    const handleSubmit = () => {
        const width = parseInt(cellWidth);
        const height = parseInt(cellHeight);

        // Check if the cell dimensions exceed the maximum rectangle dimensions
        if (width > rectangleWidth || height > rectangleHeight) {
            setErrorMessage(
                `Cell dimensions exceed the rectangle dimensions. Maximum width: ${rectangleWidth}, Maximum height: ${rectangleHeight}`
            );
            return;
        }

        // Check if the cell dimensions meet the minimum requirements
        if (width < minCellWidth || height < minCellHeight) {
            setErrorMessage(
                `Minimum width is ${minCellWidth} and minimum height is ${minCellHeight}`
            );
            return;
        }

        // If dimensions are valid, proceed with generating the grid
        setErrorMessage("");

        const numCol = Math.floor(rectangleWidth / width);
        const numRow = Math.floor(rectangleHeight / height);
        const cellCount = numCol * numRow;
        console.log("🚀 ~ handleSubmit ~ cellCount:", cellCount);

        // Generate the grid of smaller rectangles
        const newGrid: React.ReactNode[] = [];
        for (let i = 0; i < numRow; i++) {
            for (let j = 0; j < numCol; j++) {
                const color = getRandomColor();

                newGrid.push(
                    <Grid
                        key={`${i}-${j}`}
                        width={width}
                        height={height}
                        color={color}
                        onTouch={handleTouch}
                    />
                );
            }
        }
        setGrid(newGrid);
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "black",
                        padding: 5,
                        marginRight: 10,
                    }}
                    placeholder="Cell Width"
                    value={cellWidth}
                    onChangeText={setCellWidth}
                    keyboardType="numeric"
                />
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "black",
                        padding: 5,
                        marginRight: 10,
                    }}
                    placeholder="Cell Height"
                    value={cellHeight}
                    onChangeText={setCellHeight}
                    keyboardType="numeric"
                />
                <Button title="Submit" onPress={handleSubmit} />
            </View>

            <Rectangle
                style={{ width: rectangleWidth, height: rectangleHeight }}
            >
                {grid}
            </Rectangle>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                <Text style={{ marginRight: 10 }}>Selected Color:</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "black",
                        padding: 5,
                        marginTop: 10,
                    }}
                    value={selectedColor}
                    editable={false}
                />
            </View>

            {errorMessage ? (
                <Text style={{ color: "red", marginVertical: 10 }}>
                    {errorMessage}
                </Text>
            ) : null}
        </View>
    );
};

export default App;
