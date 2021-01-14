import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import Grid from "../components/grid/Grid";

const Home = () => (
  <View>
    <Text>
      Tic Tac Toe{" "}
      <Text style={{ fontSize: 15, lineHeight: 37 }}>v/s Computer</Text>
    </Text>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button mode="contained" onPress={() => console.log("Pressed X")}>
        X
      </Button>
      <Button mode="contained" onPress={() => console.log("Pressed O")}>
        O
      </Button>
    </View>
    <Grid />
  </View>
);

export default Home;
