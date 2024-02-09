import React, { useState } from "react";
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet,
    Pressable,
    Clipboard,
    Alert,
} from "react-native";
import { Rectangle, Grid } from "./components";
import { getRandomColor } from "./utils/randomColor";

const App: React.FC = () => {
    // set the size of the main rectangle
    const rectangleWidth: number = 300;
    const rectangleHeight: number = 400;
    // set the minimum cell width and height
    const minCellWidth = 10;
    const minCellHeight = 10;

    // set the width and height of each grid cell
    const [cellWidth, setCellWidth] = useState<string>("10");
    const [cellHeight, setCellHeight] = useState<string>("10");

    // Error message state
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Grid state
    const [grid, setGrid] = useState<React.ReactNode[]>([]);
    // Grid selected color state
    const [selectedColor, setSelectedColor] = useState<string>("");

    // Function to generate a random color

    // Handle grid touch
    const handleTouch = (color: string) => {
        setSelectedColor(color);
    };

    const copyToClipboard = () => {
        Clipboard.setString(selectedColor);
        Alert.alert(
            "Copied to Clipboard",
            `Color ${selectedColor} copied to clipboard.`
        );
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
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Cell Width"
                    value={cellWidth}
                    onChangeText={setCellWidth}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
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
            <View style={styles.selectColorContainer}>
                <Text style={styles.selectColorText}>Selected Color:</Text>
                <Pressable onPress={copyToClipboard}>
                    <TextInput
                        style={styles.selectedColorInput}
                        value={selectedColor}
                        editable={false}
                    />
                </Pressable>
            </View>

            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        marginRight: 10,
    },
    selectColorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    selectColorText: {
        marginRight: 10,
    },
    selectedColorInput: {
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        marginTop: 10,
    },
    errorMessage: {
        color: "red",
        marginVertical: 10,
    },
});
