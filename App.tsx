import { StyleSheet, Text, View } from "react-native";
import { Rectangle, Grid } from "./components";

export default function App() {
    // Define the size of the main rectangle
    const rectangleWidth: number = 300;
    const rectangleHeight: number = 300;

    // Define the number of rows and columns for the grid
    const numCols: number = 3;
    const numRows: number = 3;

    // Calculate the width and height of each grid cell
    const cellWidth: number = numCols / rectangleWidth;
    const cellHeight: number = numRows / rectangleHeight;

    // Generate the grid of smaller rectangles
    const grid: React.ReactNode[] = [];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            grid.push(
                <Grid
                    key={`${i}-${j}`}
                    width={50}
                    height={50}
                    text={`${i}-${j}`}
                />
            );
        }
    }

    return (
        <Rectangle style={{ width: rectangleWidth, height: rectangleHeight }}>
            {grid}
        </Rectangle>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
