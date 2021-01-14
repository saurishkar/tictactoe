import React from "react";
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

import GridCell from "./Cell";

const Grid = () => {
  return (
    <View>
      {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, rowIndex) => {
        return (
          <DataTable.Row key={rowIndex}>
            {row.map((cell, colIndex) => (
              <GridCell
                key={colIndex}
                value=""
                customStyle={colIndex != 2 ? styles.cellButton : {}}
              />
            ))}
          </DataTable.Row>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {},
  cellButton: {
    borderRightWidth: 1,
    borderRightColor: "black",
    borderRadius: 0,
  },
});

export default Grid;
