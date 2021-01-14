import React from "react";
import { View, Text, Stylesheet } from "react-native";
import { DataTable, Button } from "react-native-paper";

const GridCell = ({ value = "", customStyle = {} }) => {
  return (
    <DataTable.Cell style={{ padding: 5 }}>
      <Button onPress={() => console.log("Pressed cell")} style={customStyle}>
        {value}
      </Button>
    </DataTable.Cell>
  );
};

export default GridCell;
