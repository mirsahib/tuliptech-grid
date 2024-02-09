import React from "react";
import { Text, View, ViewStyle } from "react-native";

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
}

// Custom Grid component representing a small rectangle
const Grid: React.FC<GridProps> = ({ width, height, color }) => {
    const randomColor =
        color || "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate a random color if not provided

    return <View style={{ width, height, backgroundColor: randomColor }} />;
};

// Main App component
const App: React.FC = () => {
    // Define the size of the main rectangle
    const rectangleWidth: number = 300;
    const rectangleHeight: number = 400;
    const rectangleArea = rectangleWidth * rectangleHeight;

    // Calculate the width and height of each grid cell
    const cellWidth: number = 40;
    const cellHeight: number = 100;
    const cellArea = cellWidth * cellHeight;

    const cellCount = Math.floor(rectangleArea / cellArea);
    console.log("🚀 ~ cellCount:", cellCount);

    // Calculate the number of rows and columns
    const numRows = Math.floor(Math.sqrt(cellCount));
    const numCols = Math.floor(Math.sqrt(cellCount));

    // Generate the grid of smaller rectangles
    const grid: React.ReactNode[] = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            grid.push(
                <Grid key={`${i}-${j}`} width={cellWidth} height={cellHeight} />
            );
        }
    }

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Rectangle
                style={{ width: rectangleWidth, height: rectangleHeight }}
            >
                {grid}
            </Rectangle>
        </View>
    );
};

export default App;
